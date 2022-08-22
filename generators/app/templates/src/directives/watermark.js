// 基于 canvas 实现水印效果
const globalCanvas = null;
const globalWaterMark = null;
const env = process.env.VUE_APP_ENV;
const getDataUrl = ({
  font = "32px normal",
  fillStyle = "rgba(180,180,180,0.3)",
  textAligin,
  textBaseline,
  text = env
}) => {
  const rotate = 20;
  const canvas = globalCanvas || document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 设置宽高
  canvas.setAttribute("height", 100);
  canvas.setAttribute("width", 150);

  ctx.rotate((rotate * Math.PI) / 100);
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAligin = textAligin || "left";
  ctx.textBaseline = textBaseline || "middle";
  ctx.fillText(text, canvas.width / 10, canvas.height / 10);

  return canvas.toDataURL("image/png");
};

// 设置水印
const setWaterMark = (el, binding) => {
  const { parentElement } = el;
  // 获取相应的 canvas 画布相关的 base64 url
  const url = getDataUrl(binding);
  // 创建 waterMark 父元素
  const waterMark = globalWaterMark || document.createElement("div");
  waterMark.className = `water-mark`;
  waterMark.setAttribute("style",`background-image:url(${url})`);

  // 将对应图片父元素容器作为定位元素
  parentElement.setAttribute("style","position:relativw");
  // 将图片元素移动到 waterMark 中
  parentElement.appendChild(waterMark)
};

const createObserver = (el, binding) => {
  const waterMarkEl = el.parentElement.querySelector(".water-mark");

  const observer = new MutationObserver((mutationsList) => {
    if (mutationsList.length) {
      const { removedNodes, type, target } = mutationsList[0];
      const currStyle = waterMarkEl.getAttribute("style");

      // 证明被删除了
      if (removedNodes[0] === waterMarkEl) {
        observer.disconnect();
        // 需要手动社区 binding={value:{}},否则此时的 binding 为空
        init(el, binding={value:{}});
      } else if (
        type === "attributes" &&
        target === waterMarkEl &&
        currStyle !== style
      ) {
        waterMarkEl.setAttribute("style", style);
      }
    }
  });

  observer.observe(el.parentElement, {
    childList: true,
    attributes: true,
    subtree: true,
  });
};

// 初始化
const init = (el, binding) => {
  // 设置水印
  setWaterMark(el, binding.value);
  // 启动监控
  createObserver(el, binding.value);
};

const directives = {
  inserted(el, binding) {
    init(el,binding);
  },
};

export default {
  name: "watermark",
  directives,
}; 

