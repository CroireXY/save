import { onBeforeUnmount } from "vue";
/* Echarts图表尺寸自适应 */
export const fitChartSize = (size: number, defalteWidth = 1920) => {
  const clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!clientWidth) return size;
  const scale = clientWidth / defalteWidth;
  return Number((size * scale).toFixed(3));
};
const waitFor = (timeout = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

const startMarquee = (
  marqueeObj: string | HTMLElement,
  lh: number | string,
  speed = 20,
  delay = 1000
) => {
  //lh---每行列表的高度，speed---滚动的速度，delay---间隔多久滚动一次,marqueeObj---需要实现这个效果的id
  let p = false;
  let t: any;
  let o: HTMLElement;
  if (typeof marqueeObj === "string") {
    o = document.getElementsByClassName(marqueeObj)[0] as HTMLElement;
  }
  // else if (marqueeObj instanceof HTMLElement) {
  //     o = marqueeObj
  // }
  else {
    return new Error("所给参数不正确");
  }

  o.innerHTML += o.innerHTML;
  o.style.marginTop = (0).toString();
  o.onmouseover = function () {
    p = true;
  }; //鼠标移入，停止滚动
  o.onmouseout = function () {
    p = false;
  }; //鼠标移出，继续滚动
  if (typeof lh === "string") {
    const child = o.querySelector(lh);
    lh = child?.clientHeight || 40;
  }

  function start() {
    if (typeof t === "number") clearInterval(t);

    t = setInterval(scrolling, speed); //定时器，自动滚动
    if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
  }

  function scrolling() {
    if (parseInt(o.style.marginTop) % Number(lh) != 0) {
      o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
      if (Math.abs(parseInt(o.style.marginTop)) >= o.scrollHeight / 2)
        o.style.marginTop = 0 + "";
    } else {
      clearInterval(t);
      t = undefined;
      setTimeout(start, delay);
    }
  }

  setTimeout(start, delay);
  onBeforeUnmount(() => {
    clearInterval(t);
  });
};

export { waitFor, startMarquee };
