declare global {
	interface GlobalEventHandlersEventMap {
		msTransitionEnd: TransitionEvent;
		oTransitionEnd: TransitionEvent;
	}
}

let _elemOverlayRoot: HTMLElement;
let _elemOverlay: HTMLElement | undefined;
let _elemScrollParent: HTMLElement;
let _elemContainerParent: HTMLElement | undefined;
let _elemContainer: HTMLElement;
let _elemFocusFirst: HTMLElement;
let _elemFocusLast: HTMLElement;
let _closeCallback: (() => void) | undefined;
let _isVisible = false;
let _isVisibleAnother = false;
let _isClassAdded = false;
let _ignoreFocusTrapping = false;
let _lastFocus: HTMLElement | undefined;
let _lastFocusOnShow: HTMLElement | undefined;

function addCssClass(elem: HTMLElement, className: string) {
	elem.classList.add(className);
}

function removeCssClass(elem: HTMLElement, className: string) {
	elem.classList.remove(className);
}

function hasCssClass(elem: HTMLElement, className: string) {
	return elem.classList.contains(className);
}

function tryFocus(element: HTMLElement) {
	_ignoreFocusTrapping = true;
	try {
		element.focus();
	} catch {
		//
	}
	_ignoreFocusTrapping = false;
	return document.activeElement === element;
}

function isElement(n: Node): n is HTMLElement {
	return n.nodeType === 1;
}

function focusDescendant(parent: HTMLElement, isLast: boolean = false) {
	let n: Node | null = isLast ? parent.lastChild : parent.firstChild;
	while (n !== null) {
		if (isElement(n)) {
			if (tryFocus(n) || focusDescendant(n, isLast)) {
				return true;
			}
		}
		n = isLast ? n.previousSibling : n.nextSibling;
	}
	return false;
}

function onFocus(e: FocusEvent) {
	if (_ignoreFocusTrapping || _isVisibleAnother) {
		return;
	}
	if (e.target !== null) {
		if (_elemContainer.contains(e.target as Node)) {
			_lastFocus = e.target as HTMLElement;
		} else {
			focusDescendant(_elemContainer, false);
			if (_lastFocus === document.activeElement) {
				focusDescendant(_elemContainer, true);
			}
			_lastFocus = document.activeElement as HTMLElement;
		}
	}
}

function onKeyDown(e: KeyboardEvent) {
	if (!_isVisible || _isVisibleAnother) {
		return;
	}
	if (e.key !== undefined && e.key === 'Escape') {
		e.preventDefault();
		e.stopPropagation();
		hide();
	} else if (e.keyCode !== undefined && e.keyCode === 27) {
		e.preventDefault();
		e.stopPropagation();
		hide();
	}
}

function onShow() {
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	if (!document.body) {
		return;
	}
	document.body.addEventListener('focus', onFocus, true);
	document.body.addEventListener('keydown', onKeyDown, true);
	focusDescendant(_elemContainer, false);
	_lastFocus = _lastFocusOnShow = document.activeElement as HTMLElement;
}

function onHide() {
	document.body.removeEventListener('keydown', onKeyDown, true);
	document.body.removeEventListener('focus', onFocus, true);
	if (_lastFocusOnShow !== undefined) {
		_lastFocusOnShow.focus();
	}
}

function onClickOverlay(e: Event) {
	const elem = e.target ?? e.srcElement;
	if (
		elem === _elemOverlay ||
		elem === _elemOverlayRoot ||
		elem === _elemScrollParent ||
		elem === _elemContainer ||
		elem === _elemContainerParent
	) {
		hide();
	}
}

function afterHide() {
	if (_elemOverlayRoot.parentNode !== null) {
		_elemOverlayRoot.parentNode.removeChild(_elemOverlayRoot);
	}
	while (_elemContainer.firstChild !== null) {
		_elemContainer.removeChild(_elemContainer.firstChild);
	}
	if (_closeCallback !== undefined) {
		_closeCallback();
	}
}

function onTransitionEndOverlay(_e: TransitionEvent) {
	if (_isVisible) {
		return;
	}
	removeCssClass(document.body, 'overlayHiding');
	afterHide();
}

export function show(content: HTMLElement, closeCallback?: () => void): void {
	if (_isVisible) {
		return;
	}
	if (_elemOverlay === undefined) {
		_elemOverlayRoot = document.createElement('div');
		_elemOverlayRoot.className = 'overlayRoot';

		_elemOverlay = document.createElement('div');
		_elemOverlay.className = 'overlay';
		_elemOverlayRoot.appendChild(_elemOverlay);

		_elemScrollParent = document.createElement('div');
		_elemScrollParent.className = 'overlayScrollParent';
		_elemOverlayRoot.appendChild(_elemScrollParent);

		const dummyDiv = document.createElement('div');
		dummyDiv.style.margin = '0';
		dummyDiv.style.height = '100%';
		dummyDiv.style.width = '0';
		dummyDiv.style.verticalAlign = 'middle';
		dummyDiv.style.display = 'inline-block';
		dummyDiv.appendChild(document.createTextNode(' '));
		_elemScrollParent.appendChild(dummyDiv);

		_elemContainerParent = document.createElement('div');
		_elemContainerParent.className = 'overlayParent';
		_elemScrollParent.appendChild(_elemContainerParent);

		_elemContainer = document.createElement('div');
		_elemContainer.className = 'overlayContainer';
		_elemContainerParent.appendChild(_elemContainer);

		// dummy element
		_elemFocusFirst = document.createElement('div');
		_elemFocusFirst.tabIndex = 0;
		_elemFocusFirst.style.position = 'fixed';
		_elemContainerParent.insertBefore(_elemFocusFirst, _elemContainer);
		_elemFocusLast = document.createElement('div');
		_elemFocusLast.tabIndex = 0;
		_elemFocusLast.style.position = 'fixed';
		_elemContainerParent.appendChild(_elemFocusLast);

		_elemOverlayRoot.addEventListener('click', onClickOverlay, false);
		_elemOverlayRoot.addEventListener(
			'transitionend',
			onTransitionEndOverlay,
			false
		);
		_elemOverlayRoot.addEventListener(
			'msTransitionEnd',
			onTransitionEndOverlay,
			false
		);
		_elemOverlayRoot.addEventListener(
			'oTransitionEnd',
			onTransitionEndOverlay,
			false
		);
	}
	document.body.appendChild(_elemOverlayRoot);
	if (content.parentNode !== null) {
		content.parentNode.removeChild(content);
	}
	_closeCallback = closeCallback;
	_isVisible = true;
	setTimeout(() => {
		_elemContainer.appendChild(content);
		if (!hasCssClass(document.body, 'overlayVisible')) {
			_isClassAdded = true;
			removeCssClass(document.body, 'overlayHiding');
			addCssClass(document.body, 'overlayVisible');
		}
		addCssClass(content, 'overlayCurrent');
		onShow();
	}, 0);
}

export function hide(): void {
	if (_elemOverlay === undefined || !_isVisible) {
		return;
	}
	_isVisible = false;
	removeCssClass(_elemContainer.firstChild as HTMLElement, 'overlayCurrent');
	let callAfterHide = true;
	if (_isClassAdded) {
		removeCssClass(document.body, 'overlayVisible');
		addCssClass(document.body, 'overlayHiding');
		_isClassAdded = false;
		callAfterHide = false;
	}
	onHide();
	if (callAfterHide) {
		afterHide();
	}
}

export function setAnotherOverlayVisible(visible: boolean): void {
	_isVisibleAnother = visible;
}
