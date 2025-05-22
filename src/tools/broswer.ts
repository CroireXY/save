/*
 * @Author: Sun ruiqi
 * @Date: 2025-05-12 06:14:25
 * @LastEditors: viola
 * @LastEditTime: 2025-05-22 11:30:17
 * @FilePath: \code\src\tools\broswer.ts
 */

export const getExplorerInfo = () => {
	const t: any = navigator.userAgent.toLowerCase();
	return 0 <= t.indexOf("msie")
			? {
				//ie 
				type: "IE",
				version: Number(t.match(/msie ([\d]+)/)[1]),
			}
			: t.match(/trident\/.+?rv:(([\d.]+))/)
					? {
						
						type: "IE",
						version: 11,
					}
					: 0 <= t.indexOf("edge")
							? {
								type: "Edge",
								version: Number(t.match(/edge\/([\d]+)/)[1]),
							}
							: 0 <= t.indexOf("firefox")
									? {
										type: "Firefox",
										version: Number(t.match(/firefox\/([\d]+)/)[1]),
									}
									: 0 <= t.indexOf("chrome")
											? {
												type: "Chrome",
												version: Number(t.match(/chrome\/([\d]+)/)[1]),
											}
											: 0 <= t.indexOf("opera")
													? {
														type: "Opera",
														version: Number(t.match(/opera.([\d]+)/)[1]),
													}
													: 0 <= t.indexOf("Safari")
															? {
																type: "Safari",
																version: Number(t.match(/version\/([\d]+)/)[1]),
															}
															: {
																type: t,
																version: -1,
															};
};

/**
 * @description: 滚动到页面顶部
 * @param {*}
 * @return {*}
 */
export const scrollToTop = () => {
	const height = document.documentElement.scrollTop || document.body.scrollTop;
	if (height > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, height - height / 8);
	}
};

/**
 * @description:滚动到页面底部
 * @param {*}
 * @return {*}
 */
export const scrollToBottom = () => {
	window.scrollTo(0, document.documentElement.clientHeight);
};

/**
 * @description: 滚动到指定元素区域
 * @param {any} element
 * @return {*}
 */
export const smoothScroll = (element: any) => {
	document.querySelector(element).scrollIntoView({
		behavior: "smooth",
	});
};

/**
 * @description:获取可视窗口高度
 * @param {*}
 * @return {*}
 */
export const getClientHeight = () => {
	let clientHeight = 0;
	if (document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight =
				document.body.clientHeight < document.documentElement.clientHeight
						? document.body.clientHeight
						: document.documentElement.clientHeight;
	} else {
		clientHeight =
				document.body.clientHeight > document.documentElement.clientHeight
						? document.body.clientHeight
						: document.documentElement.clientHeight;
	}
	return clientHeight;
};

/**
 * @description:获取可视窗口宽度
 * @param {*}
 * @return {*}
 */
export const getPageViewWidth = () => {
	return (
			document.compatMode == "BackCompat"
					? document.body
					: document.documentElement
	).clientWidth;
};

/**
 * @description: 打开浏览器全屏
 * @param {*}
 * @return {*}
 */
export const toFullScreen = () => {
	const element: any = document.body;
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullScreen();
	}
};

/**
 * @description: 退出浏览器全屏
 * @param {*}
 * @return {*}
 */
export const exitFullscreen = () => {
	const element: any = document;
	if (element.exitFullscreen) {
		element.exitFullscreen();
	} else if (element.exitFullscreen) {
		element.exitFullscreen();
	} else if (element.mozCancelFullScreen) {
		element.mozCancelFullScreen();
	} else if (element.webkitExitFullscreen) {
		element.webkitExitFullscreen();
	}
};
