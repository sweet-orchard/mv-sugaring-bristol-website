var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// test-render-ua.jsx
import React5, { useEffect as useEffect5 } from "react";
import { renderToString } from "react-dom/server";

// src/components/ServicesSection.jsx
import React4, { useState as useState3 } from "react";

// node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
import { jsx as jsx3, Fragment } from "react/jsx-runtime";
import { useMemo as useMemo2, useRef as useRef3, useState, useContext as useContext3 } from "react";

// node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
import { createContext } from "react";
var LayoutGroupContext = createContext({});

// node_modules/framer-motion/dist/es/utils/use-constant.mjs
import { useRef } from "react";
function useConstant(init) {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
import { jsx as jsx2 } from "react/jsx-runtime";
import * as React2 from "react";
import { useId as useId2, useCallback, useMemo } from "react";

// node_modules/framer-motion/dist/es/context/PresenceContext.mjs
import { createContext as createContext2 } from "react";
var PresenceContext = createContext2(null);

// node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { useId, useRef as useRef2, useContext, useInsertionEffect } from "react";

// node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
import { createContext as createContext3 } from "react";
var MotionConfigContext = createContext3({
  transformPagePoint: (p) => p,
  isStatic: false,
  reducedMotion: "never"
});

// node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var PopChildMeasure = class extends React.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent) {
      const size = this.props.sizeRef.current;
      size.height = element.offsetHeight || 0;
      size.width = element.offsetWidth || 0;
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
};
function PopChild({ children, isPresent }) {
  const id3 = useId();
  const ref = useRef2(null);
  const size = useRef2({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  const { nonce } = useContext(MotionConfigContext);
  useInsertionEffect(() => {
    const { width, height, top, left } = size.current;
    if (isPresent || !ref.current || !width || !height)
      return;
    ref.current.dataset.motionPopId = id3;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    document.head.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id3}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `);
    }
    return () => {
      document.head.removeChild(style);
    };
  }, [isPresent]);
  return jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, children: React.cloneElement(children, { ref }) });
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id3 = useId2();
  const memoizedOnExitComplete = useCallback((childId) => {
    presenceChildren.set(childId, true);
    for (const isComplete of presenceChildren.values()) {
      if (!isComplete)
        return;
    }
    onExitComplete && onExitComplete();
  }, [presenceChildren, onExitComplete]);
  const context = useMemo(
    () => ({
      id: id3,
      initial,
      isPresent,
      custom,
      onExitComplete: memoizedOnExitComplete,
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    presenceAffectsLayout ? [Math.random(), memoizedOnExitComplete] : [isPresent, memoizedOnExitComplete]
  );
  useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  React2.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  if (mode === "popLayout") {
    children = jsx2(PopChild, { isPresent, children });
  }
  return jsx2(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
import { useContext as useContext2, useId as useId3, useEffect as useEffect2, useCallback as useCallback2 } from "react";
function usePresence(subscribe = true) {
  const context = useContext2(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id3 = useId3();
  useEffect2(() => {
    if (subscribe)
      register(id3);
  }, [subscribe]);
  const safeToRemove = useCallback2(() => subscribe && onExitComplete && onExitComplete(id3), [id3, onExitComplete, subscribe]);
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
import { Children, isValidElement } from "react";
var getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
import { useLayoutEffect, useEffect as useEffect3 } from "react";

// node_modules/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser = typeof window !== "undefined";

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect3;

// node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = useMemo2(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = useRef3(true);
  const pendingPresentChildren = useRef3(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const [diffedChildren, setDiffedChildren] = useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return;
  }
  if (mode === "wait" && renderedChildren.length > 1) {
    console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  }
  const { forceRender } = useContext3(LayoutGroupContext);
  return jsx3(Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitComplete.has(key)) {
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender === null || forceRender === void 0 ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsx3(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom: isPresent ? void 0 : custom, presenceAffectsLayout, mode, onExitComplete: isPresent ? void 0 : onExit, children: child }, key);
  }) });
};

// node_modules/motion-utils/dist/es/noop.mjs
var noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;

// node_modules/motion-utils/dist/es/errors.mjs
var warning = noop;
var invariant = noop;
if (true) {
  warning = (check, message) => {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant = (check, message) => {
    if (!check) {
      throw new Error(message);
    }
  };
}

// node_modules/motion-utils/dist/es/memo.mjs
// @__NO_SIDE_EFFECTS__
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}

// node_modules/motion-utils/dist/es/progress.mjs
var progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// node_modules/motion-utils/dist/es/time-conversion.mjs
var secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
var millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;

// node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs
var MotionGlobalConfig = {
  skipAnimations: false,
  useManualTiming: false
};

// node_modules/framer-motion/dist/es/frameloop/render-step.mjs
function createRenderStep(runNextFrame) {
  let thisFrame = /* @__PURE__ */ new Set();
  let nextFrame = /* @__PURE__ */ new Set();
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  let latestFrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (!queue.has(callback))
        queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      latestFrameData = frameData2;
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      thisFrame.forEach(triggerCallback);
      thisFrame.clear();
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}

// node_modules/framer-motion/dist/es/frameloop/batcher.mjs
var stepsOrder = [
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(flagRunNextFrame);
    return acc;
  }, {});
  const { read, resolveKeyframes, update, preRender, render, postRender } = steps;
  const processBatch = () => {
    const timestamp = MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    state.timestamp = timestamp;
    state.isProcessing = true;
    read.process(state);
    resolveKeyframes.process(state);
    update.process(state);
    preRender.process(state);
    render.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => {
    for (let i = 0; i < stepsOrder.length; i++) {
      steps[stepsOrder[i]].cancel(process2);
    }
  };
  return { schedule, cancel, state, steps };
}

// node_modules/framer-motion/dist/es/frameloop/frame.mjs
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);

// node_modules/framer-motion/dist/es/context/LazyContext.mjs
import { createContext as createContext4 } from "react";
var LazyContext = createContext4({ strict: false });

// node_modules/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
var featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: (props) => featureProps[key].some((name) => !!props[name])
  };
}

// node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures(features) {
  for (const key in features) {
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key]
    };
  }
}

// node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}

// node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp(__require("@emotion/is-prop-valid").default);
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
    props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// node_modules/framer-motion/dist/es/utils/warn-once.mjs
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, element) {
  if (condition || warned.has(message))
    return;
  console.warn(message);
  if (element)
    console.warn(element);
  warned.add(message);
}

// node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function createDOMMotionComponentProxy(componentFactory) {
  if (typeof Proxy === "undefined") {
    return componentFactory;
  }
  const componentCache = /* @__PURE__ */ new Map();
  const deprecatedFactoryFunction = (...args) => {
    if (true) {
      warnOnce(false, "motion() is deprecated. Use motion.create() instead.");
    }
    return componentFactory(...args);
  };
  return new Proxy(deprecatedFactoryFunction, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (key === "create")
        return componentFactory;
      if (!componentCache.has(key)) {
        componentCache.set(key, componentFactory(key));
      }
      return componentCache.get(key);
    }
  });
}

// node_modules/framer-motion/dist/es/motion/index.mjs
import { jsxs, jsx as jsx4 } from "react/jsx-runtime";
import { forwardRef, useContext as useContext6 } from "react";

// node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
import { createContext as createContext5 } from "react";
var MotionContext = createContext5({});

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
import { useContext as useContext4, useMemo as useMemo3 } from "react";

// node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}

// node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}

// node_modules/framer-motion/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
var variantProps = ["initial", ...variantPriorityOrder];

// node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}

// node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  const { initial, animate } = getCurrentTreeVariants(props, useContext4(MotionContext));
  return useMemo3(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
var motionComponentSymbol = Symbol.for("motionComponentSymbol");

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
import { useCallback as useCallback3 } from "react";

// node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement, externalRef) {
  return useCallback3(
    (instance) => {
      if (instance) {
        visualState.onMount && visualState.onMount(instance);
      }
      if (visualElement) {
        if (instance) {
          visualElement.mount(instance);
        } else {
          visualElement.unmount();
        }
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  );
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
import { useContext as useContext5, useRef as useRef4, useInsertionEffect as useInsertionEffect2, useEffect as useEffect4 } from "react";

// node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
var camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();

// node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId = "framerAppearId";
var optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

// node_modules/framer-motion/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = createRenderBatcher(queueMicrotask, false);

// node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
import { createContext as createContext6 } from "react";
var SwitchLayoutGroupContext = createContext6({});

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component3, visualState, props, createVisualElement, ProjectionNodeConstructor) {
  var _a, _b;
  const { visualElement: parent } = useContext5(MotionContext);
  const lazyContext = useContext5(LazyContext);
  const presenceContext = useContext5(PresenceContext);
  const reducedMotionConfig = useContext5(MotionConfigContext).reducedMotion;
  const visualElementRef = useRef4(null);
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component3, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  const initialLayoutGroupConfig = useContext5(SwitchLayoutGroupContext);
  if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
    createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
  }
  const isMounted = useRef4(false);
  useInsertionEffect2(() => {
    if (visualElement && isMounted.current) {
      visualElement.update(props, presenceContext);
    }
  });
  const optimisedAppearId = props[optimizedAppearDataAttribute];
  const wantsHandoff = useRef4(Boolean(optimisedAppearId) && !((_a = window.MotionHandoffIsComplete) === null || _a === void 0 ? void 0 : _a.call(window, optimisedAppearId)) && ((_b = window.MotionHasOptimisedAnimation) === null || _b === void 0 ? void 0 : _b.call(window, optimisedAppearId)));
  useIsomorphicLayoutEffect(() => {
    if (!visualElement)
      return;
    isMounted.current = true;
    window.MotionIsMounted = true;
    visualElement.updateFeatures();
    microtask.render(visualElement.render);
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  useEffect4(() => {
    if (!visualElement)
      return;
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      queueMicrotask(() => {
        var _a2;
        (_a2 = window.MotionHandoffMarkAsComplete) === null || _a2 === void 0 ? void 0 : _a2.call(window, optimisedAppearId);
      });
      wantsHandoff.current = false;
    }
  });
  return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
  const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot } = props;
  visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
  visualElement.projection.setOptions({
    layoutId,
    layout: layout2,
    alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
    visualElement,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof layout2 === "string" ? layout2 : "both",
    initialPromotionConfig,
    layoutScroll,
    layoutRoot
  });
}
function getClosestProjectingNode(visualElement) {
  if (!visualElement)
    return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}

// node_modules/framer-motion/dist/es/motion/index.mjs
function createRendererMotionComponent({ preloadedFeatures, createVisualElement, useRender, useVisualState, Component: Component3 }) {
  var _a, _b;
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    let MeasureLayout2;
    const configAndProps = {
      ...useContext6(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const { isStatic } = configAndProps;
    const context = useCreateMotionContext(props);
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      useStrictMode(configAndProps, preloadedFeatures);
      const layoutProjection = getProjectionFunctionality(configAndProps);
      MeasureLayout2 = layoutProjection.MeasureLayout;
      context.visualElement = useVisualElement(Component3, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
    }
    return jsxs(MotionContext.Provider, { value: context, children: [MeasureLayout2 && context.visualElement ? jsx4(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps }) : null, useRender(Component3, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)] });
  }
  MotionComponent.displayName = `motion.${typeof Component3 === "string" ? Component3 : `create(${(_b = (_a = Component3.displayName) !== null && _a !== void 0 ? _a : Component3.name) !== null && _b !== void 0 ? _b : ""})`}`;
  const ForwardRefMotionComponent = forwardRef(MotionComponent);
  ForwardRefMotionComponent[motionComponentSymbol] = Component3;
  return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
  const layoutGroupId = useContext6(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
  const isStrict = useContext6(LazyContext).strict;
  if (preloadedFeatures && isStrict) {
    const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    configAndProps.ignoreStrict ? warning(false, strictMessage) : invariant(false, strictMessage);
  }
}
function getProjectionFunctionality(props) {
  const { drag: drag2, layout: layout2 } = featureDefinitions;
  if (!drag2 && !layout2)
    return {};
  const combined = { ...drag2, ...layout2 };
  return {
    MeasureLayout: (drag2 === null || drag2 === void 0 ? void 0 : drag2.isEnabled(props)) || (layout2 === null || layout2 === void 0 ? void 0 : layout2.isEnabled(props)) ? combined.MeasureLayout : void 0,
    ProjectionNode: combined.ProjectionNode
  };
}

// node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component3) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component3 !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component3.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component3) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/u.test(Component3)
  ) {
    return true;
  }
  return false;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
import { useContext as useContext7 } from "react";

// node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
  const state = [{}, {}];
  visualElement === null || visualElement === void 0 ? void 0 : visualElement.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  return definition;
}

// node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v) => {
  return Array.isArray(v);
};

// node_modules/framer-motion/dist/es/utils/resolve-value.mjs
var isCustomValue = (v) => {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = (v) => {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

// node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = (value) => Boolean(value && value.getVelocity);

// node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3, createRenderState, onUpdate }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  if (onUpdate) {
    state.onMount = (instance) => onUpdate({ props, current: instance, ...state });
    state.onUpdate = (visualElement) => onUpdate(visualElement);
  }
  return state;
}
var makeUseVisualState = (config) => (props, isStatic) => {
  const context = useContext7(MotionContext);
  const presenceContext = useContext7(PresenceContext);
  const make = () => makeState(config, props, context, presenceContext);
  return isStatic ? make() : useConstant(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate === void 0)
      animate = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    for (let i = 0; i < list.length; i++) {
      const resolved = resolveVariantFromProps(props, list[i]);
      if (resolved) {
        const { transitionEnd, transition, ...target } = resolved;
        for (const key in target) {
          let valueTarget = target[key];
          if (Array.isArray(valueTarget)) {
            const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
            valueTarget = valueTarget[index];
          }
          if (valueTarget !== null) {
            values[key] = valueTarget;
          }
        }
        for (const key in transitionEnd) {
          values[key] = transitionEnd[key];
        }
      }
    }
  }
  return values;
}

// node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs
var transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps = new Set(transformPropOrder);

// node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
var startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

// node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
var getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// node_modules/framer-motion/dist/es/utils/clamp.mjs
var clamp = (min, max, v) => {
  if (v > max)
    return max;
  if (v < min)
    return min;
  return v;
};

// node_modules/framer-motion/dist/es/value/types/numbers/index.mjs
var number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha = {
  ...number,
  transform: (v) => clamp(0, 1, v)
};
var scale = {
  ...number,
  default: 1
};

// node_modules/framer-motion/dist/es/value/types/numbers/units.mjs
var createUnitType = (unit) => ({
  test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
var degrees = /* @__PURE__ */ createUnitType("deg");
var percent = /* @__PURE__ */ createUnitType("%");
var px = /* @__PURE__ */ createUnitType("px");
var vh = /* @__PURE__ */ createUnitType("vh");
var vw = /* @__PURE__ */ createUnitType("vw");
var progressPercentage = {
  ...percent,
  parse: (v) => percent.parse(v) / 100,
  transform: (v) => percent.transform(v * 100)
};

// node_modules/framer-motion/dist/es/render/dom/value-types/number-browser.mjs
var browserNumberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px
};

// node_modules/framer-motion/dist/es/render/dom/value-types/transform.mjs
var transformValueTypes = {
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px
};

// node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs
var int = {
  ...number,
  transform: Math.round
};

// node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
var numberValueTypes = {
  ...browserNumberValueTypes,
  ...transformValueTypes,
  zIndex: int,
  size: px,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform, transformTemplate) {
  let transformString = "";
  let transformIsDefault = true;
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    const value = latestValues[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      valueIsDefault = parseFloat(value) === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform[key] = valueAsType;
      }
    }
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}

// node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform2 = true;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate) {
      style.transform = buildTransform(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}

// node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}

// node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag2, transformTemplate) {
  buildHTMLStyles(state, latest, transformTemplate);
  if (isSVGTag2) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style, dimensions } = state;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});

// node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});

// node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

// node_modules/framer-motion/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);

// node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}

// node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout: layout2, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  var _a;
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || ((_a = visualElement === null || visualElement === void 0 ? void 0 : visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.liveStyle) !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
function updateSVGDimensions(instance, renderState) {
  try {
    renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
  } catch (e) {
    renderState.dimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
}
var layoutProps = ["x", "y", "width", "height", "cx", "cy", "r"];
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState,
    onUpdate: ({ props, prevProps, current, renderState, latestValues }) => {
      if (!current)
        return;
      let hasTransform2 = !!props.drag;
      if (!hasTransform2) {
        for (const key in latestValues) {
          if (transformProps.has(key)) {
            hasTransform2 = true;
            break;
          }
        }
      }
      if (!hasTransform2)
        return;
      let needsMeasure = !prevProps;
      if (prevProps) {
        for (let i = 0; i < layoutProps.length; i++) {
          const key = layoutProps[i];
          if (props[key] !== prevProps[key]) {
            needsMeasure = true;
          }
        }
      }
      if (!needsMeasure)
        return;
      frame.read(() => {
        updateSVGDimensions(current, renderState);
        frame.render(() => {
          buildSVGAttrs(renderState, latestValues, isSVGTag(current.tagName), props.transformTemplate);
          renderSVG(current, renderState);
        });
      });
    }
  })
};

// node_modules/framer-motion/dist/es/render/html/config-motion.mjs
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
import { Fragment as Fragment2, useMemo as useMemo6, createElement } from "react";

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
import { useMemo as useMemo4 } from "react";
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
  return useMemo4(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
function useStyle(props, visualState) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState));
  return style;
}
function useHTMLProps(props, visualState) {
  const htmlProps = {};
  const style = useStyle(props, visualState);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
import { useMemo as useMemo5 } from "react";
function useSVGProps(props, visualState, _isStatic, Component3) {
  const visualProps = useMemo5(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, isSVGTag(Component3), props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps = false) {
  const useRender = (Component3, props, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component3) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component3);
    const filteredProps = filterProps(props, typeof Component3 === "string", forwardMotionProps);
    const elementProps = Component3 !== Fragment2 ? { ...filteredProps, ...visualProps, ref } : {};
    const { children } = props;
    const renderedChildren = useMemo6(() => isMotionValue(children) ? children.get() : children, [children]);
    return createElement(Component3, {
      ...elementProps,
      children: renderedChildren
    });
  };
  return useRender;
}

// node_modules/framer-motion/dist/es/render/components/create-factory.mjs
function createMotionComponentFactory(preloadedFeatures, createVisualElement) {
  return function createMotionComponent2(Component3, { forwardMotionProps } = { forwardMotionProps: false }) {
    const baseConfig = isSVGComponent(Component3) ? svgMotionConfig : htmlMotionConfig;
    const config = {
      ...baseConfig,
      preloadedFeatures,
      useRender: createUseRender(forwardMotionProps),
      createVisualElement,
      Component: Component3
    };
    return createRendererMotionComponent(config);
  };
}

// node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}

// node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}

// node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var supportsScrollTimeline = memo(() => window.ScrollTimeline !== void 0);

// node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs
var BaseGroupPlaybackControls = class {
  constructor(animations2) {
    this.stop = () => this.runAll("stop");
    this.animations = animations2.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((animation) => "finished" in animation ? animation.finished : animation));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline, fallback) {
    const subscriptions = this.animations.map((animation) => {
      if (supportsScrollTimeline() && animation.attachTimeline) {
        return animation.attachTimeline(timeline);
      } else if (typeof fallback === "function") {
        return fallback(animation);
      }
    });
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time2) {
    this.setAll("time", time2);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let max = 0;
    for (let i = 0; i < this.animations.length; i++) {
      max = Math.max(max, this.animations[i].duration);
    }
    return max;
  }
  runAll(methodName) {
    this.animations.forEach((controls) => controls[methodName]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
};

// node_modules/motion-dom/dist/es/animation/controls/Group.mjs
var GroupPlaybackControls = class extends BaseGroupPlaybackControls {
  then(onResolve, onReject) {
    return Promise.all(this.animations).then(onResolve).catch(onReject);
  }
};

// node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function getValueTransition(transition, key) {
  return transition ? transition[key] || transition["default"] || transition : void 0;
}

// node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}

// node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function isGenerator(type) {
  return typeof type === "function";
}

// node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs
function attachTimeline(animation, timeline) {
  animation.timeline = timeline;
  animation.onfinish = null;
}

// node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs
var isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";

// node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var supportsFlags = {
  linearEasing: void 0
};

// node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function memoSupports(callback, supportsFlag) {
  const memoized = memo(callback);
  return () => {
    var _a;
    return (_a = supportsFlags[supportsFlag]) !== null && _a !== void 0 ? _a : memoized();
  };
}

// node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");

// node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
var generateLinearEasing = (easing, duration, resolution = 10) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i = 0; i < numPoints; i++) {
    points += easing(progress(0, numPoints - 1, i)) + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs
function isWaapiSupportedEasing(easing) {
  return Boolean(typeof easing === "function" && supportsLinearEasing() || !easing || typeof easing === "string" && (easing in supportedWaapiEasing || supportsLinearEasing()) || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
var supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};
function mapEasingToNativeEasing(easing, duration) {
  if (!easing) {
    return void 0;
  } else if (typeof easing === "function" && supportsLinearEasing()) {
    return generateLinearEasing(easing, duration);
  } else if (isBezierDefinition(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
  } else {
    return supportedWaapiEasing[easing];
  }
}

// node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs
var isDragging = {
  x: false,
  y: false
};
function isDragActive() {
  return isDragging.x || isDragging.y;
}

// node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function resolveElements(elementOrSelector, scope, selectorCache) {
  var _a;
  if (elementOrSelector instanceof Element) {
    return [elementOrSelector];
  } else if (typeof elementOrSelector === "string") {
    let root = document;
    if (scope) {
      root = scope.current;
    }
    const elements = (_a = selectorCache === null || selectorCache === void 0 ? void 0 : selectorCache[elementOrSelector]) !== null && _a !== void 0 ? _a : root.querySelectorAll(elementOrSelector);
    return elements ? Array.from(elements) : [];
  }
  return Array.from(elementOrSelector);
}

// node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
function setupGesture(elementOrSelector, options) {
  const elements = resolveElements(elementOrSelector);
  const gestureAbortController = new AbortController();
  const eventOptions = {
    passive: true,
    ...options,
    signal: gestureAbortController.signal
  };
  const cancel = () => gestureAbortController.abort();
  return [elements, eventOptions, cancel];
}

// node_modules/motion-dom/dist/es/gestures/hover.mjs
function filterEvents(callback) {
  return (event) => {
    if (event.pointerType === "touch" || isDragActive())
      return;
    callback(event);
  };
}
function hover(elementOrSelector, onHoverStart, options = {}) {
  const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
  const onPointerEnter = filterEvents((enterEvent) => {
    const { target } = enterEvent;
    const onHoverEnd = onHoverStart(enterEvent);
    if (typeof onHoverEnd !== "function" || !target)
      return;
    const onPointerLeave = filterEvents((leaveEvent) => {
      onHoverEnd(leaveEvent);
      target.removeEventListener("pointerleave", onPointerLeave);
    });
    target.addEventListener("pointerleave", onPointerLeave, eventOptions);
  });
  elements.forEach((element) => {
    element.addEventListener("pointerenter", onPointerEnter, eventOptions);
  });
  return cancel;
}

// node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
var isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs
var isPrimaryPointer = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};

// node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs
var focusableElements = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function isElementKeyboardAccessible(element) {
  return focusableElements.has(element.tagName) || element.tabIndex !== -1;
}

// node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs
var isPressing = /* @__PURE__ */ new WeakSet();

// node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
function filterEvents2(callback) {
  return (event) => {
    if (event.key !== "Enter")
      return;
    callback(event);
  };
}
function firePointerEvent(target, type) {
  target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
}
var enableKeyboardPress = (focusEvent, eventOptions) => {
  const element = focusEvent.currentTarget;
  if (!element)
    return;
  const handleKeydown = filterEvents2(() => {
    if (isPressing.has(element))
      return;
    firePointerEvent(element, "down");
    const handleKeyup = filterEvents2(() => {
      firePointerEvent(element, "up");
    });
    const handleBlur = () => firePointerEvent(element, "cancel");
    element.addEventListener("keyup", handleKeyup, eventOptions);
    element.addEventListener("blur", handleBlur, eventOptions);
  });
  element.addEventListener("keydown", handleKeydown, eventOptions);
  element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};

// node_modules/motion-dom/dist/es/gestures/press/index.mjs
function isValidPressEvent(event) {
  return isPrimaryPointer(event) && !isDragActive();
}
function press(elementOrSelector, onPressStart, options = {}) {
  const [elements, eventOptions, cancelEvents] = setupGesture(elementOrSelector, options);
  const startPress = (startEvent) => {
    const element = startEvent.currentTarget;
    if (!isValidPressEvent(startEvent) || isPressing.has(element))
      return;
    isPressing.add(element);
    const onPressEnd = onPressStart(startEvent);
    const onPointerEnd = (endEvent, success) => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      if (!isValidPressEvent(endEvent) || !isPressing.has(element)) {
        return;
      }
      isPressing.delete(element);
      if (typeof onPressEnd === "function") {
        onPressEnd(endEvent, { success });
      }
    };
    const onPointerUp = (upEvent) => {
      onPointerEnd(upEvent, options.useGlobalTarget || isNodeOrChild(element, upEvent.target));
    };
    const onPointerCancel = (cancelEvent) => {
      onPointerEnd(cancelEvent, false);
    };
    window.addEventListener("pointerup", onPointerUp, eventOptions);
    window.addEventListener("pointercancel", onPointerCancel, eventOptions);
  };
  elements.forEach((element) => {
    if (!isElementKeyboardAccessible(element) && element.getAttribute("tabindex") === null) {
      element.tabIndex = 0;
    }
    const target = options.useGlobalTarget ? window : element;
    target.addEventListener("pointerdown", startPress, eventOptions);
    element.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions), eventOptions);
  });
  return cancelEvents;
}

// node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function setDragLock(axis) {
  if (axis === "x" || axis === "y") {
    if (isDragging[axis]) {
      return null;
    } else {
      isDragging[axis] = true;
      return () => {
        isDragging[axis] = false;
      };
    }
  } else {
    if (isDragging.x || isDragging.y) {
      return null;
    } else {
      isDragging.x = isDragging.y = true;
      return () => {
        isDragging.x = isDragging.y = false;
      };
    }
  }
}

// node_modules/framer-motion/dist/es/render/html/utils/keys-position.mjs
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...transformPropOrder
]);

// node_modules/framer-motion/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
  now = void 0;
}
var time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};

// node_modules/framer-motion/dist/es/utils/array.mjs
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}

// node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// node_modules/framer-motion/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
var collectMotionValues = {
  current: void 0
};
var MotionValue = class {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(init, options = {}) {
    this.version = "11.18.2";
    this.canTrackVelocity = null;
    this.events = {};
    this.updateAndNotify = (v, render = true) => {
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev && this.events.change) {
        this.events.change.notify(this.current);
      }
      if (render && this.events.renderRequest) {
        this.events.renderRequest.notify(this.current);
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time.now();
    if (this.canTrackVelocity === null && current !== void 0) {
      this.canTrackVelocity = isFloat(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (true) {
      warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
function motionValue(init, options) {
  return new MotionValue(init, options);
}

// node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}

// node_modules/framer-motion/dist/es/value/use-will-change/is.mjs
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  }
}

// node_modules/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute];
}

// node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
var instantAnimationState = {
  current: false
};

// node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

// node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

// node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = (easing) => (p) => 1 - easing(1 - p);

// node_modules/framer-motion/dist/es/easing/back.mjs
var backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
var backIn = /* @__PURE__ */ reverseEasing(backOut);
var backInOut = /* @__PURE__ */ mirrorEasing(backIn);

// node_modules/framer-motion/dist/es/easing/anticipate.mjs
var anticipate = (p) => (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));

// node_modules/framer-motion/dist/es/easing/circ.mjs
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circIn);

// node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
var isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);

// node_modules/framer-motion/dist/es/animation/utils/is-none.mjs
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}

// node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs
var sanitize = (v) => Math.round(v * 1e5) / 1e5;

// node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

// node_modules/framer-motion/dist/es/value/types/utils/is-nullish.mjs
function isNullish(v) {
  return v == null;
}

// node_modules/framer-motion/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

// node_modules/framer-motion/dist/es/value/types/color/utils.mjs
var isColorString = (type, testProp) => (v) => {
  return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
  if (typeof v !== "string")
    return v;
  const [a, b, c, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// node_modules/framer-motion/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
  ...number,
  transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba = {
  test: /* @__PURE__ */ isColorString("rgb", "red"),
  parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// node_modules/framer-motion/dist/es/value/types/color/hex.mjs
function parseHex(v) {
  let r = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r += r;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
var hex = {
  test: /* @__PURE__ */ isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// node_modules/framer-motion/dist/es/value/types/color/hsla.mjs
var hsla = {
  test: /* @__PURE__ */ isColorString("hsl", "hue"),
  parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// node_modules/framer-motion/dist/es/value/types/color/index.mjs
var color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};

// node_modules/framer-motion/dist/es/value/types/utils/color-regex.mjs
var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

// node_modules/framer-motion/dist/es/value/types/complex/index.mjs
function test(v) {
  var _a, _b;
  return isNaN(v) && typeof v === "string" && (((_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = v.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
    if (color.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN);
      values.push(color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function createTransformer(source) {
  const { split, types } = analyseComplexValue(source);
  const numSections = split.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== void 0) {
        const type = types[i];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += color.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone(v) {
  const parsed = parseComplexValue(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone
};

// node_modules/framer-motion/dist/es/value/types/complex/filter.mjs
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
var filter = {
  ...complex,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};

// node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
var defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
};
var getDefaultValueType = (key) => defaultValueTypes[key];

// node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
function getAnimatableNone2(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

// node_modules/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs
var invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = void 0;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i];
    if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone2(name, animatableTemplate);
    }
  }
}

// node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
var isNumOrPxType = (v) => v === number || v === px;
var getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
var getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform }) => {
  if (transform === "none" || !transform)
    return 0;
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/u);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform.match(/^matrix\((.+)\)$/u);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
};
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
var positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;

// node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs
var toResolve = /* @__PURE__ */ new Set();
var isScheduled = false;
var anyNeedsMeasurement = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          var _a;
          (_a = element.getValue(key)) === null || _a === void 0 ? void 0 : _a.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach((resolver) => resolver.complete());
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  readAllKeyframes();
  measureAllKeyframes();
}
var KeyframeResolver = class {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
    this.isComplete = false;
    this.isAsync = false;
    this.needsMeasurement = false;
    this.isScheduled = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue2;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.isScheduled = true;
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        frame.read(readAllKeyframes);
        frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null) {
        if (i === 0) {
          const currentValue = motionValue2 === null || motionValue2 === void 0 ? void 0 : motionValue2.get();
          const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
          if (currentValue !== void 0) {
            unresolvedKeyframes[0] = currentValue;
          } else if (element && name) {
            const valueAsRead = element.readValue(name, finalKeyframe);
            if (valueAsRead !== void 0 && valueAsRead !== null) {
              unresolvedKeyframes[0] = valueAsRead;
            }
          }
          if (unresolvedKeyframes[0] === void 0) {
            unresolvedKeyframes[0] = finalKeyframe;
          }
          if (motionValue2 && currentValue === void 0) {
            motionValue2.set(unresolvedKeyframes[0]);
          }
        } else {
          unresolvedKeyframes[i] = unresolvedKeyframes[i - 1];
        }
      }
    }
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete() {
    this.isComplete = true;
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe);
    toResolve.delete(this);
  }
  cancel() {
    if (!this.isComplete) {
      this.isScheduled = false;
      toResolve.delete(this);
    }
  }
  resume() {
    if (!this.isComplete)
      this.scheduleResolve();
  }
};

// node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
var isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);

// node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
var splitCSSVariableRegex = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 !== null && token1 !== void 0 ? token1 : token2}`, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}

// node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
var testValueType = (v) => (type) => type.test(v);

// node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
var auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};

// node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));

// node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs
var DOMKeyframesResolver = class extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current)
      return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if (isCSSVariableToken(keyframe)) {
          const resolved = getVariableValue(keyframe, element.current);
          if (resolved !== void 0) {
            unresolvedKeyframes[i] = resolved;
          }
          if (i === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    this.resolveNoneKeyframes();
    if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType(origin);
    const targetType = findDimensionValueType(target);
    if (originType === targetType)
      return;
    if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (isNone(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    var _a;
    const { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if ((_a = this.removedTransforms) === null || _a === void 0 ? void 0 : _a.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
};

// node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
var isAnimatable = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// node_modules/framer-motion/dist/es/animation/animators/utils/can-animate.mjs
function hasKeyframesChanged(keyframes2) {
  const current = keyframes2[0];
  if (keyframes2.length === 1)
    return true;
  for (let i = 0; i < keyframes2.length; i++) {
    if (keyframes2[i] !== current)
      return true;
  }
}
function canAnimate(keyframes2, name, type, velocity) {
  const originKeyframe = keyframes2[0];
  if (originKeyframe === null)
    return false;
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes2[keyframes2.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
}

// node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe) {
  const resolvedKeyframes = keyframes2.filter(isNotNull);
  const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/framer-motion/dist/es/animation/animators/BaseAnimation.mjs
var MAX_RESOLVE_DELAY = 40;
var BaseAnimation = class {
  constructor({ autoplay = true, delay: delay2 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", ...options }) {
    this.isStopped = false;
    this.hasAttemptedResolve = false;
    this.createdAt = time.now();
    this.options = {
      autoplay,
      delay: delay2,
      type,
      repeat,
      repeatDelay,
      repeatType,
      ...options
    };
    this.updateFinishedPromise();
  }
  /**
   * This method uses the createdAt and resolvedAt to calculate the
   * animation startTime. *Ideally*, we would use the createdAt time as t=0
   * as the following frame would then be the first frame of the animation in
   * progress, which would feel snappier.
   *
   * However, if there's a delay (main thread work) between the creation of
   * the animation and the first commited frame, we prefer to use resolvedAt
   * to avoid a sudden jump into the animation.
   */
  calcStartTime() {
    if (!this.resolvedAt)
      return this.createdAt;
    return this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    if (!this._resolved && !this.hasAttemptedResolve) {
      flushKeyframeResolvers();
    }
    return this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(keyframes2, finalKeyframe) {
    this.resolvedAt = time.now();
    this.hasAttemptedResolve = true;
    const { name, type, velocity, delay: delay2, onComplete, onUpdate, isGenerator: isGenerator2 } = this.options;
    if (!isGenerator2 && !canAnimate(keyframes2, name, type, velocity)) {
      if (instantAnimationState.current || !delay2) {
        onUpdate && onUpdate(getFinalKeyframe(keyframes2, this.options, finalKeyframe));
        onComplete && onComplete();
        this.resolveFinishedPromise();
        return;
      } else {
        this.options.duration = 0;
      }
    }
    const resolvedAnimation = this.initPlayback(keyframes2, finalKeyframe);
    if (resolvedAnimation === false)
      return;
    this._resolved = {
      keyframes: keyframes2,
      finalKeyframe,
      ...resolvedAnimation
    };
    this.onPostResolved();
  }
  onPostResolved() {
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.currentFinishedPromise.then(resolve, reject);
  }
  flatten() {
    this.options.type = "keyframes";
    this.options.ease = "linear";
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((resolve) => {
      this.resolveFinishedPromise = resolve;
    });
  }
};

// node_modules/framer-motion/dist/es/utils/mix/number.mjs
var mixNumber = (from, to, progress2) => {
  return from + (to - from) * progress2;
};

// node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// node_modules/framer-motion/dist/es/utils/mix/immediate.mjs
function mixImmediate(a, b) {
  return (p) => p > 0 ? b : a;
}

// node_modules/framer-motion/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color2) {
  const type = getColorType(color2);
  warning(Boolean(type), `'${color2}' is not an animatable color. Use the equivalent color code instead.`);
  if (!Boolean(type))
    return false;
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
var mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) {
    return mixImmediate(from, to);
  }
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba.transform(blended);
  };
};

// node_modules/framer-motion/dist/es/utils/pipe.mjs
var combineFunctions = (a, b) => (v) => b(a(v));
var pipe = (...transformers) => transformers.reduce(combineFunctions);

// node_modules/framer-motion/dist/es/utils/mix/visibility.mjs
var invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
  if (invisibleValues.has(origin)) {
    return (p) => p <= 0 ? origin : target;
  } else {
    return (p) => p >= 1 ? target : origin;
  }
}

// node_modules/framer-motion/dist/es/utils/mix/complex.mjs
function mixNumber2(a, b) {
  return (p) => mixNumber(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber2;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  var _a;
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = (_a = origin.values[originIndex]) !== null && _a !== void 0 ? _a : 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
      return mixVisibility(origin, target);
    }
    return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return mixImmediate(origin, target);
  }
};

// node_modules/framer-motion/dist/es/utils/mix/index.mjs
function mix(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber(from, to, p);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}

// node_modules/framer-motion/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

// node_modules/framer-motion/dist/es/animation/generators/spring/defaults.mjs
var springDefaults = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};

// node_modules/framer-motion/dist/es/animation/generators/spring/find.mjs
var safeMin = 1e-3;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
  duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: springDefaults.velocity,
    stiffness: springDefaults.stiffness,
    damping: springDefaults.damping,
    mass: springDefaults.mass,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    if (options.visualDuration) {
      const visualDuration = options.visualDuration;
      const root = 2 * Math.PI / (visualDuration * 1.2);
      const stiffness = root * root;
      const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults.mass,
        stiffness,
        damping
      };
    } else {
      const derived = findSpring(options);
      springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults.mass
      };
      springOptions.isResolvedFromDuration = true;
    }
  }
  return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
  const options = typeof optionsOrVisualDuration !== "object" ? {
    visualDuration: optionsOrVisualDuration,
    keyframes: [0, 1],
    bounce
  } : optionsOrVisualDuration;
  let { restSpeed, restDelta } = options;
  const origin = options.keyframes[0];
  const target = options.keyframes[options.keyframes.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
  restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
  }
  const generator = {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        let currentVelocity = 0;
        if (dampingRatio < 1) {
          currentVelocity = t === 0 ? secondsToMilliseconds(initialVelocity) : calcGeneratorVelocity(resolveSpring, t, current);
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    },
    toString: () => {
      const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
      const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
      return calculatedDuration + "ms " + easing;
    }
  };
  return generator;
}

// node_modules/framer-motion/dist/es/animation/generators/inertia.mjs
function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes2[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: calcGeneratorVelocity(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}

// node_modules/framer-motion/dist/es/easing/ease.mjs
var easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
var easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
var easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);

// node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};

// node_modules/framer-motion/dist/es/easing/utils/map.mjs
var easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
var easingDefinitionToFunction = (definition) => {
  if (isBezierDefinition(definition)) {
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
    return easingLookup[definition];
  }
  return definition;
};

// node_modules/framer-motion/dist/es/utils/interpolate.mjs
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i] || noop : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    if (isZeroDeltaRange && v < input[0])
      return output[0];
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}

// node_modules/framer-motion/dist/es/utils/offsets/fill.mjs
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mixNumber(min, 1, offsetProgress));
  }
}

// node_modules/framer-motion/dist/es/utils/offsets/default.mjs
function defaultOffset(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}

// node_modules/framer-motion/dist/es/utils/offsets/time.mjs
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}

// node_modules/framer-motion/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}

// node_modules/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs
var frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: () => frame.update(passTimestamp, true),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};

// node_modules/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs
var generators = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
var percentToProgress = (percent2) => percent2 / 100;
var MainThreadAnimation = class extends BaseAnimation {
  constructor(options) {
    super(options);
    this.holdTime = null;
    this.cancelTime = null;
    this.currentTime = 0;
    this.playbackSpeed = 1;
    this.pendingPlayState = "running";
    this.startTime = null;
    this.state = "idle";
    this.stop = () => {
      this.resolver.cancel();
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      const { onStop } = this.options;
      onStop && onStop();
    };
    const { name, motionValue: motionValue2, element, keyframes: keyframes2 } = this.options;
    const KeyframeResolver$1 = (element === null || element === void 0 ? void 0 : element.KeyframeResolver) || KeyframeResolver;
    const onResolved = (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe);
    this.resolver = new KeyframeResolver$1(keyframes2, onResolved, name, motionValue2, element);
    this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten();
    if (this._resolved) {
      Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
    }
  }
  initPlayback(keyframes$1) {
    const { type = "keyframes", repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = this.options;
    const generatorFactory = isGenerator(type) ? type : generators[type] || keyframes;
    let mapPercentToKeyframes;
    let mirroredGenerator;
    if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
      if (true) {
        invariant(keyframes$1.length === 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`);
      }
      mapPercentToKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({ ...this.options, keyframes: keyframes$1 });
    if (repeatType === "mirror") {
      mirroredGenerator = generatorFactory({
        ...this.options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration(generator);
    }
    const { calculatedDuration } = generator;
    const resolvedDuration = calculatedDuration + repeatDelay;
    const totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
    return {
      generator,
      mirroredGenerator,
      mapPercentToKeyframes,
      calculatedDuration,
      resolvedDuration,
      totalDuration
    };
  }
  onPostResolved() {
    const { autoplay = true } = this.options;
    this.play();
    if (this.pendingPlayState === "paused" || !autoplay) {
      this.pause();
    } else {
      this.state = this.pendingPlayState;
    }
  }
  tick(timestamp, sample = false) {
    const { resolved } = this;
    if (!resolved) {
      const { keyframes: keyframes3 } = this.options;
      return { done: true, value: keyframes3[keyframes3.length - 1] };
    }
    const { finalKeyframe, generator, mirroredGenerator, mapPercentToKeyframes, keyframes: keyframes2, calculatedDuration, totalDuration, resolvedDuration } = resolved;
    if (this.startTime === null)
      return generator.next(0);
    const { delay: delay2, repeat, repeatType, repeatDelay, onUpdate } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = Math.round(timestamp - this.startTime) * this.speed;
    }
    const timeWithoutDelay = this.currentTime - delay2 * (this.speed >= 0 ? 1 : -1);
    const isInDelayPhase = this.speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    const state = isInDelayPhase ? { done: false, value: keyframes2[0] } : frameGenerator.next(elapsed);
    if (mapPercentToKeyframes) {
      state.value = mapPercentToKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.speed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && finalKeyframe !== void 0) {
      state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  get duration() {
    const { resolved } = this;
    return resolved ? millisecondsToSeconds(resolved.calculatedDuration) : 0;
  }
  get time() {
    return millisecondsToSeconds(this.currentTime);
  }
  set time(newTime) {
    newTime = secondsToMilliseconds(newTime);
    this.currentTime = newTime;
    if (this.holdTime !== null || this.speed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.speed;
    }
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    const hasChanged = this.playbackSpeed !== newSpeed;
    this.playbackSpeed = newSpeed;
    if (hasChanged) {
      this.time = millisecondsToSeconds(this.currentTime);
    }
  }
  play() {
    if (!this.resolver.isScheduled) {
      this.resolver.resume();
    }
    if (!this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver = frameloopDriver, onPlay, startTime } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    onPlay && onPlay();
    const now2 = this.driver.now();
    if (this.holdTime !== null) {
      this.startTime = now2 - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
    } else if (this.state === "finished") {
      this.startTime = now2;
    }
    if (this.state === "finished") {
      this.updateFinishedPromise();
    }
    this.cancelTime = this.startTime;
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    var _a;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    this.state = "paused";
    this.holdTime = (_a = this.currentTime) !== null && _a !== void 0 ? _a : 0;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.pendingPlayState = this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.teardown();
    this.state = "finished";
    const { onComplete } = this.options;
    onComplete && onComplete();
  }
  cancel() {
    if (this.cancelTime !== null) {
      this.tick(this.cancelTime);
    }
    this.teardown();
    this.updateFinishedPromise();
  }
  teardown() {
    this.state = "idle";
    this.stopDriver();
    this.resolveFinishedPromise();
    this.updateFinishedPromise();
    this.startTime = this.cancelTime = null;
    this.resolver.cancel();
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(time2) {
    this.startTime = 0;
    return this.tick(time2, true);
  }
};

// node_modules/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs
var acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);

// node_modules/framer-motion/dist/es/animation/animators/waapi/index.mjs
function startWaapiAnimation(element, valueName, keyframes2, { delay: delay2 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeInOut", times } = {}) {
  const keyframeOptions = { [valueName]: keyframes2 };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2, duration);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  return element.animate(keyframeOptions, {
    delay: delay2,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  });
}

// node_modules/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs
var supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));

// node_modules/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs
var sampleDelta = 10;
var maxDuration = 2e4;
function requiresPregeneratedKeyframes(options) {
  return isGenerator(options.type) || options.type === "spring" || !isWaapiSupportedEasing(options.ease);
}
function pregenerateKeyframes(keyframes2, options) {
  const sampleAnimation = new MainThreadAnimation({
    ...options,
    keyframes: keyframes2,
    repeat: 0,
    delay: 0,
    isGenerator: true
  });
  let state = { done: false, value: keyframes2[0] };
  const pregeneratedKeyframes = [];
  let t = 0;
  while (!state.done && t < maxDuration) {
    state = sampleAnimation.sample(t);
    pregeneratedKeyframes.push(state.value);
    t += sampleDelta;
  }
  return {
    times: void 0,
    keyframes: pregeneratedKeyframes,
    duration: t - sampleDelta,
    ease: "linear"
  };
}
var unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
var AcceleratedAnimation = class extends BaseAnimation {
  constructor(options) {
    super(options);
    const { name, motionValue: motionValue2, element, keyframes: keyframes2 } = this.options;
    this.resolver = new DOMKeyframesResolver(keyframes2, (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe), name, motionValue2, element);
    this.resolver.scheduleResolve();
  }
  initPlayback(keyframes2, finalKeyframe) {
    let { duration = 300, times, ease: ease2, type, motionValue: motionValue2, name, startTime } = this.options;
    if (!motionValue2.owner || !motionValue2.owner.current) {
      return false;
    }
    if (typeof ease2 === "string" && supportsLinearEasing() && isUnsupportedEase(ease2)) {
      ease2 = unsupportedEasingFunctions[ease2];
    }
    if (requiresPregeneratedKeyframes(this.options)) {
      const { onComplete, onUpdate, motionValue: motionValue3, element, ...options } = this.options;
      const pregeneratedAnimation = pregenerateKeyframes(keyframes2, options);
      keyframes2 = pregeneratedAnimation.keyframes;
      if (keyframes2.length === 1) {
        keyframes2[1] = keyframes2[0];
      }
      duration = pregeneratedAnimation.duration;
      times = pregeneratedAnimation.times;
      ease2 = pregeneratedAnimation.ease;
      type = "keyframes";
    }
    const animation = startWaapiAnimation(motionValue2.owner.current, name, keyframes2, { ...this.options, duration, times, ease: ease2 });
    animation.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
    if (this.pendingTimeline) {
      attachTimeline(animation, this.pendingTimeline);
      this.pendingTimeline = void 0;
    } else {
      animation.onfinish = () => {
        const { onComplete } = this.options;
        motionValue2.set(getFinalKeyframe(keyframes2, this.options, finalKeyframe));
        onComplete && onComplete();
        this.cancel();
        this.resolveFinishedPromise();
      };
    }
    return {
      animation,
      duration,
      times,
      type,
      ease: ease2,
      keyframes: keyframes2
    };
  }
  get duration() {
    const { resolved } = this;
    if (!resolved)
      return 0;
    const { duration } = resolved;
    return millisecondsToSeconds(duration);
  }
  get time() {
    const { resolved } = this;
    if (!resolved)
      return 0;
    const { animation } = resolved;
    return millisecondsToSeconds(animation.currentTime || 0);
  }
  set time(newTime) {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.currentTime = secondsToMilliseconds(newTime);
  }
  get speed() {
    const { resolved } = this;
    if (!resolved)
      return 1;
    const { animation } = resolved;
    return animation.playbackRate;
  }
  set speed(newSpeed) {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.playbackRate = newSpeed;
  }
  get state() {
    const { resolved } = this;
    if (!resolved)
      return "idle";
    const { animation } = resolved;
    return animation.playState;
  }
  get startTime() {
    const { resolved } = this;
    if (!resolved)
      return null;
    const { animation } = resolved;
    return animation.startTime;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(timeline) {
    if (!this._resolved) {
      this.pendingTimeline = timeline;
    } else {
      const { resolved } = this;
      if (!resolved)
        return noop;
      const { animation } = resolved;
      attachTimeline(animation, timeline);
    }
    return noop;
  }
  play() {
    if (this.isStopped)
      return;
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    if (animation.playState === "finished") {
      this.updateFinishedPromise();
    }
    animation.play();
  }
  pause() {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.pause();
  }
  stop() {
    this.resolver.cancel();
    this.isStopped = true;
    if (this.state === "idle")
      return;
    this.resolveFinishedPromise();
    this.updateFinishedPromise();
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation, keyframes: keyframes2, duration, type, ease: ease2, times } = resolved;
    if (animation.playState === "idle" || animation.playState === "finished") {
      return;
    }
    if (this.time) {
      const { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options;
      const sampleAnimation = new MainThreadAnimation({
        ...options,
        keyframes: keyframes2,
        duration,
        type,
        ease: ease2,
        times,
        isGenerator: true
      });
      const sampleTime = secondsToMilliseconds(this.time);
      motionValue2.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
    }
    const { onStop } = this.options;
    onStop && onStop();
    this.cancel();
  }
  complete() {
    const { resolved } = this;
    if (!resolved)
      return;
    resolved.animation.finish();
  }
  cancel() {
    const { resolved } = this;
    if (!resolved)
      return;
    resolved.animation.cancel();
  }
  static supports(options) {
    const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type } = options;
    if (!motionValue2 || !motionValue2.owner || !(motionValue2.owner.current instanceof HTMLElement)) {
      return false;
    }
    const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
    return supportsWaapi() && name && acceleratedValues.has(name) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !onUpdate && !transformTemplate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
  }
};

// node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
var ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
  if (keyframes2.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
  }
  return ease;
};

// node_modules/framer-motion/dist/es/animation/utils/is-transition-defined.mjs
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
  return !!Object.keys(transition).length;
}

// node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition(transition, name) || {};
  const delay2 = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds(delay2);
  let options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    options = {
      ...options,
      ...getDefaultTransition(name, options)
    };
  }
  if (options.duration) {
    options.duration = secondsToMilliseconds(options.duration);
  }
  if (options.repeatDelay) {
    options.repeatDelay = secondsToMilliseconds(options.repeatDelay);
  }
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    options.duration = 0;
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (instantAnimationState.current || MotionGlobalConfig.skipAnimations) {
    shouldSkip = true;
    options.duration = 0;
    options.delay = 0;
  }
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return new GroupPlaybackControls([]);
    }
  }
  if (!isHandoff && AcceleratedAnimation.supports(options)) {
    return new AcceleratedAnimation(options);
  } else {
    return new MainThreadAnimation(options);
  }
};

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  var _a;
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
  if (transitionOverride)
    transition = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key, (_a = visualElement.latestValues[key]) !== null && _a !== void 0 ? _a : null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay2,
      ...getValueTransition(transition || {}, key)
    };
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, frame);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    addValueToWillChange(visualElement, key);
    value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations2.push(animation);
    }
  }
  if (transitionEnd) {
    Promise.all(animations2).then(() => {
      frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd);
      });
    });
  }
  return animations2;
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant(visualElement, variant, options = {}) {
  var _a;
  const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom : void 0);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
    child.notify("AnimationStart", variant);
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a, b) {
  return a.sortNodePosition(b);
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => {
    visualElement.notify("AnimationComplete", definition);
  });
}

// node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs
var numVariantProps = variantProps.length;
function getVariantContext(visualElement) {
  if (!visualElement)
    return void 0;
  if (!visualElement.isControllingVariants) {
    const context2 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
    if (visualElement.props.initial !== void 0) {
      context2.initial = visualElement.props.initial;
    }
    return context2;
  }
  const context = {};
  for (let i = 0; i < numVariantProps; i++) {
    const name = variantProps[i];
    const prop = visualElement.props[name];
    if (isVariantLabel(prop) || prop === false) {
      context[name] = prop;
    }
  }
  return context;
}

// node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
  let animate = animateList(visualElement);
  let state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (type) => (acc, definition) => {
    var _a;
    const resolved = resolveVariant(visualElement, definition, type === "exit" ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom : void 0);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(changedActiveType) {
    const { props } = visualElement;
    const context = getVariantContext(visualElement.parent) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
        const motionValue2 = visualElement.getValue(key);
        if (motionValue2)
          motionValue2.liveStyle = false;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        let valueHasChanged = false;
        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
          valueHasChanged = !shallowCompare(next, prev);
        } else {
          valueHasChanged = next !== prev;
        }
        if (valueHasChanged) {
          if (next !== void 0 && next !== null) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      const willAnimateViaParent = isInherited && variantDidChange;
      const needsAnimating = !willAnimateViaParent || handledRemovedValues;
      if (shouldAnimateType && needsAnimating) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: { type }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        const motionValue2 = visualElement.getValue(key);
        if (motionValue2)
          motionValue2.liveStyle = true;
        fallbackAnimation[key] = fallbackTarget !== null && fallbackTarget !== void 0 ? fallbackTarget : null;
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate(animations2) : Promise.resolve();
  }
  function setActive(type, isActive) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    const animations2 = animateChanges(type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state,
    reset: () => {
      state = createState();
      isInitialRender = true;
    }
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}

// node_modules/framer-motion/dist/es/motion/features/Feature.mjs
var Feature = class {
  constructor(node) {
    this.isMounted = false;
    this.node = node;
  }
  update() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/animation/index.mjs
var AnimationFeature = class extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    if (isAnimationControls(animate)) {
      this.unmountControls = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
    var _a;
    this.node.animationState.reset();
    (_a = this.unmountControls) === null || _a === void 0 ? void 0 : _a.call(this);
  }
};

// node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs
var id = 0;
var ExitAnimationFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.id = id++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent, onExitComplete } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent === prevIsPresent) {
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
    if (onExitComplete && !isPresent) {
      exitAnimation.then(() => onExitComplete(this.id));
    }
  }
  mount() {
    const { register } = this.node.presenceContext || {};
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};

// node_modules/framer-motion/dist/es/events/add-dom-event.mjs
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}

// node_modules/framer-motion/dist/es/events/event-info.mjs
function extractEventInfo(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY
    }
  };
}
var addPointerInfo = (handler) => {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};

// node_modules/framer-motion/dist/es/events/add-pointer-event.mjs
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}

// node_modules/framer-motion/dist/es/utils/distance.mjs
var distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
  const xDelta = distance(a.x, b.x);
  const yDelta = distance(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}

// node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
var PanSession = class {
  constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin)
        resumeAnimation && resumeAnimation();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelFrame(this.updatePoint);
  }
};
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time2 = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time2 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
var SCALE_PRECISION = 1e-4;
var SCALE_MIN = 1 - SCALE_PRECISION;
var SCALE_MAX = 1 + SCALE_PRECISION;
var TRANSLATE_PRECISION = 0.01;
var TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
var TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mixNumber(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  delta.translate = mixNumber(target.min, target.max, delta.origin) - delta.originPoint;
  if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) {
    delta.scale = 1;
  }
  if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) {
    delta.translate = 0;
  }
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout2, parent) {
  target.min = layout2.min - parent.min;
  target.max = target.min + calcLength(layout2);
}
function calcRelativePosition(target, layout2, parent) {
  calcRelativeAxisPosition(target.x, layout2.x, parent.x);
  calcRelativeAxisPosition(target.y, layout2.y, parent.y);
}

// node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mixNumber(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mixNumber(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin2(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout2, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout2.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout2.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}

// node_modules/framer-motion/dist/es/projection/geometry/models.mjs
var createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
var createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
var createAxis = () => ({ min: 0, max: 0 });
var createBox = () => ({
  x: createAxis(),
  y: createAxis()
});

// node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}

// node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  const topLeft = transformPoint2({ x: point.left, y: point.top });
  const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point, scale2, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
var TREE_SCALE_SNAP_MIN = 0.999999999999;
var TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    const { visualElement } = node.options;
    if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
    treeScale.x = 1;
  }
  if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
    treeScale.y = 1;
  }
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
  const originPoint = mixNumber(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function transformBox(box, transform) {
  transformAxis(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
  transformAxis(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
}

// node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll } = rootProjectionNode2;
  if (scroll) {
    translateAxis(viewportBox.x, scroll.offset.x);
    translateAxis(viewportBox.y, scroll.offset.y);
  }
  return viewportBox;
}

// node_modules/framer-motion/dist/es/utils/get-context-window.mjs
var getContextWindow = ({ current }) => {
  return current ? current.ownerDocument.defaultView : null;
};

// node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
  constructor(visualElement) {
    this.openDragLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      const { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
      dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event).point);
      }
    };
    const onStart = (event, info) => {
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openDragLock)
          this.openDragLock();
        this.openDragLock = setDragLock(drag2);
        if (!this.openDragLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) {
        frame.postRender(() => onDragStart(event, info));
      }
      addValueToWillChange(this.visualElement, "transform");
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openDragLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    const resumeAnimation = () => eachAxis((axis) => {
      var _a;
      return this.getAnimationState(axis) === "paused" && ((_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.play());
    });
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      contextWindow: getContextWindow(this.visualElement)
    });
  }
  stop(event, info) {
    const isDragging2 = this.isDragging;
    this.cancel();
    if (!isDragging2)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame.postRender(() => onDragEnd(event, info));
    }
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openDragLock) {
      this.openDragLock();
      this.openDragLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    var _a;
    const { dragConstraints, dragElastic } = this.getProps();
    const layout2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a = this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout2) {
        this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout2 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.constraints !== false && this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    addValueToWillChange(this.visualElement, axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis((axis) => {
      var _a;
      return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.pause();
    });
  }
  getAnimationState(axis) {
    var _a;
    return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mixNumber(min, max, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints) && dragConstraints.current) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    frame.read(measureDragConstraints);
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    }));
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// node_modules/framer-motion/dist/es/gestures/drag/index.mjs
var DragGesture = class extends Feature {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
};

// node_modules/framer-motion/dist/es/gestures/pan/index.mjs
var asyncHandler = (handler) => (event, info) => {
  if (handler) {
    frame.postRender(() => handler(event, info));
  }
};
var PanGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: getContextWindow(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler(onPanSessionStart),
      onStart: asyncHandler(onPanStart),
      onMove: onPan,
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd) {
          frame.postRender(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
import { jsx as jsx5 } from "react/jsx-runtime";
import { useContext as useContext8, Component as Component2 } from "react";

// node_modules/framer-motion/dist/es/projection/node/state.mjs
var globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};

// node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};

// node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var MeasureLayoutWithContext = class extends Component2 {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag2, isPresent } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      microtask.postRender(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
};
function MeasureLayout(props) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = useContext8(LayoutGroupContext);
  return jsx5(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: useContext8(SwitchLayoutGroupContext), isPresent, safeToRemove });
}
var defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// node_modules/framer-motion/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes2, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
  return motionValue$1.animation;
}

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs
function isSVGElement(element) {
  return element instanceof SVGElement && element.tagName !== "svg";
}

// node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
var compareByDepth = (a, b) => a.depth - b.depth;

// node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = class {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};

// node_modules/framer-motion/dist/es/utils/delay.mjs
function delay(callback, timeout) {
  const start = time.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelFrame(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  frame.read(checkElapsed, true);
  return () => cancelFrame(checkElapsed);
}

// node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mixNumber(
      0,
      // TODO Reinstate this if only child
      lead.opacity !== void 0 ? lead.opacity : 1,
      easeCrossfadeIn(progress2)
    );
    target.opacityExit = mixNumber(follow.opacity !== void 0 ? follow.opacity : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mixNumber(follow.opacity !== void 0 ? follow.opacity : 1, lead.opacity !== void 0 ? lead.opacity : 1, progress2);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mixNumber(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mixNumber(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, 0.5, circOut);
var easeCrossfadeOut = /* @__PURE__ */ compress(0.5, 0.95, noop);
function compress(min, max, easing) {
  return (p) => {
    if (p < min)
      return 0;
    if (p > max)
      return 1;
    return easing(progress(min, max, p));
  };
}

// node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
function copyAxisDeltaInto(delta, originDelta) {
  delta.translate = originDelta.translate;
  delta.scale = originDelta.scale;
  delta.originPoint = originDelta.originPoint;
  delta.origin = originDelta.origin;
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mixNumber(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mixNumber(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}

// node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
  return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
  return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
  return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
  return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
function axisDeltaEquals(a, b) {
  return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}

// node_modules/framer-motion/dist/es/projection/shared/stack.mjs
var NodeStack = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node.root && node.root.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      const { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
};

// node_modules/framer-motion/dist/es/projection/styles/transform.mjs
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  const zTranslate = (latestTransform === null || latestTransform === void 0 ? void 0 : latestTransform.z) || 0;
  if (xTranslate || yTranslate || zTranslate) {
    transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = latestTransform;
    if (transformPerspective)
      transform = `perspective(${transformPerspective}px) ${transform}`;
    if (rotate)
      transform += `rotate(${rotate}deg) `;
    if (rotateX)
      transform += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform += `rotateY(${rotateY}deg) `;
    if (skewX)
      transform += `skewX(${skewX}deg) `;
    if (skewY)
      transform += `skewY(${skewY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform || "none";
}

// node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var metrics = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
var isDebug = typeof window !== "undefined" && window.MotionDebug !== void 0;
var transformAxes = ["", "X", "Y", "Z"];
var hiddenVisibility = { visibility: "hidden" };
var animationTarget = 1e3;
var id2 = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
  const { latestValues } = visualElement;
  if (latestValues[key]) {
    values[key] = latestValues[key];
    visualElement.setStaticValue(key, 0);
    if (sharedAnimationValues) {
      sharedAnimationValues[key] = 0;
    }
  }
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
  projectionNode.hasCheckedOptimisedAppear = true;
  if (projectionNode.root === projectionNode)
    return;
  const { visualElement } = projectionNode.options;
  if (!visualElement)
    return;
  const appearId = getOptimisedAppearId(visualElement);
  if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
    const { layout: layout2, layoutId } = projectionNode.options;
    window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout2 || layoutId));
  }
  const { parent } = projectionNode;
  if (parent && !parent.hasCheckedOptimisedAppear) {
    cancelTreeOptimisedTransformAnimations(parent);
  }
}
function createProjectionNode2({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
      this.id = id2++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.hasCheckedOptimisedAppear = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.updateScheduled = false;
      this.scheduleUpdate = () => this.update();
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        if (isDebug) {
          metrics.totalNodes = metrics.resolvedTargetDeltas = metrics.recalculatedProjection = 0;
        }
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        if (isDebug) {
          window.MotionDebug.record(metrics);
        }
      };
      this.resolvedRelativeTargetAt = 0;
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement(instance);
      this.instance = instance;
      const { layoutId, layout: layout2, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (isLayoutDirty && (layout2 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout2)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const targetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout) || hasRelativeTargetChanged;
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetSkewAndRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations(this);
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout: layout2 } = this.options;
      if (layoutId === void 0 && !layout2)
        return;
      const transformTemplate = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty);
      }
      this.isUpdating = false;
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      const now2 = time.now();
      frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp);
      frameData.timestamp = now2;
      frameData.isProcessing = true;
      frameSteps.update.process(frameData);
      frameSteps.preRender.process(frameData);
      frameSteps.render.process(frameData);
      frameData.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        microtask.read(this.scheduleUpdate);
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        const isRoot = checkIsScrollRoot(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot,
          offset: measureScroll(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : isRoot
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var _a;
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const wasInScrollRoot = ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) || this.path.some(checkNodeWasScrollRoot);
      if (!wasInScrollRoot) {
        const { scroll } = this.root;
        if (scroll) {
          translateAxis(box.x, scroll.offset.x);
          translateAxis(box.y, scroll.offset.y);
        }
      }
      return box;
    }
    removeElementScroll(box) {
      var _a;
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      if ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) {
        return boxWithoutScroll;
      }
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll, options } = node;
        if (node !== this.root && scroll && options.layoutScroll) {
          if (scroll.wasRoot) {
            copyBoxInto(boxWithoutScroll, box);
          }
          translateAxis(boxWithoutScroll.x, scroll.offset.x);
          translateAxis(boxWithoutScroll.y, scroll.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      var _a;
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty) || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      if (!this.layout || !(layout2 || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData.timestamp;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (isDebug) {
        metrics.resolvedTargetDeltas++;
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var _a;
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty)) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout2 || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
        lead.targetWithTransforms = createBox();
      }
      const { target } = lead;
      if (!target) {
        if (this.prevProjectionDelta) {
          this.createProjectionDeltas();
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta || !this.prevProjectionDelta) {
        this.createProjectionDeltas();
      } else {
        copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
        copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
      }
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      if (isDebug) {
        metrics.recalculatedProjection++;
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      var _a;
      (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.scheduleRender();
      if (notifyAll) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = createDelta();
      this.projectionDelta = createDelta();
      this.projectionDeltaWithTransform = createDelta();
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation && this.currentAnimation.stop();
      if (this.resumingFrom && this.resumingFrom.currentAnimation) {
        this.resumingFrom.currentAnimation.stop();
      }
      if (this.pendingAnimation) {
        cancelFrame(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.currentAnimation = animateSingleValue(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onComplete: () => {
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout2, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout2)
        return;
      if (this !== lead && this.layout && layout2 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout2.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
    }
    getPrevLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetSkewAndRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasDistortingTransform = false;
      const { latestValues } = visualElement;
      if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
        hasDistortingTransform = true;
      }
      if (!hasDistortingTransform)
        return;
      const resetValues = {};
      if (latestValues.z) {
        resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
      }
      for (let i = 0; i < transformAxes.length; i++) {
        resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
        resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
        if (this.animationValues) {
          this.animationValues[key] = resetValues[key];
        }
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp) {
      var _a, _b;
      if (!this.instance || this.isSVG)
        return void 0;
      if (!this.isVisible) {
        return hiddenVisibility;
      }
      const styles = {
        visibility: ""
      };
      const transformTemplate = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x, y } = this.projectionDelta;
      styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_b = (_a = valuesToRender.opacity) !== null && _a !== void 0 ? _a : this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo } = scaleCorrectors[key];
        const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            styles[applyTo[i]] = corrected;
          }
        } else {
          styles[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a;
        return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a;
  const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout2, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout2[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout2[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox);
          if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout2,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  if (isDebug) {
    metrics.totalNodes++;
  }
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetSkewAndRotation(node) {
  node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
  output.translate = mixNumber(delta.translate, 0, p);
  output.scale = mixNumber(delta.scale, 1, p);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
  output.min = mixNumber(from.min, to.min, p);
  output.max = mixNumber(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
  mixAxis(output.x, from.x, to.x, p);
  mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
  axis.min = roundPoint(axis.min);
  axis.max = roundPoint(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2);
}
function checkNodeWasScrollRoot(node) {
  var _a;
  return node !== node.root && ((_a = node.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot);
}

// node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode = createProjectionNode2({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});

// node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode2({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});

// node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// node_modules/framer-motion/dist/es/gestures/hover.mjs
function handleHoverEvent(node, event, lifecycle) {
  const { props } = node;
  if (node.animationState && props.whileHover) {
    node.animationState.setActive("whileHover", lifecycle === "Start");
  }
  const eventName = "onHover" + lifecycle;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
var HoverGesture = class extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = hover(current, (startEvent) => {
      handleHoverEvent(this.node, startEvent, "Start");
      return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
    });
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/gestures/focus.mjs
var FocusGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/gestures/press.mjs
function handlePressEvent(node, event, lifecycle) {
  const { props } = node;
  if (node.animationState && props.whileTap) {
    node.animationState.setActive("whileTap", lifecycle === "Start");
  }
  const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
var PressGesture = class extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = press(current, (startEvent) => {
      handlePressEvent(this.node, startEvent, "Start");
      return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
    }, { useGlobalTarget: this.node.props.globalTapTarget });
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
var fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var thresholdNames = {
  some: 0,
  all: 1
};
var InViewFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    return observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
  }
};
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport[name] !== prevViewport[name];
}

// node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout.mjs
var layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
import { Fragment as Fragment3 } from "react";

// node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };

// node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}

// node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex];
var findValueType = (v) => valueTypes.find(testValueType(v));

// node_modules/framer-motion/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();

// node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (true) {
        warnOnce(nextValue.version === "11.18.2", `Attempting to mix Motion versions ${nextValue.version} with 11.18.2 may not work as expected.`);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// node_modules/framer-motion/dist/es/render/VisualElement.mjs
var propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var VisualElement = class {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0;
    this.scheduleRender = () => {
      const now2 = time.now();
      if (this.renderScheduledAt < now2) {
        this.renderScheduledAt = now2;
        frame.render(this.render, false, true);
      }
    };
    const { latestValues, renderState, onUpdate } = visualState;
    this.onUpdate = onUpdate;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
  }
  mount(instance) {
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (true) {
      warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.");
    }
    if (this.parent)
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    visualElementStore.delete(this.current);
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    const valueIsTransform = transformProps.has(key);
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    let removeSyncCheck;
    if (window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
      if (removeSyncCheck)
        removeSyncCheck();
      if (value.owner)
        value.stop();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in featureDefinitions) {
      const featureDefinition = featureDefinitions[key];
      if (!featureDefinition)
        continue;
      const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
    this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    var _a;
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0 ? _a : this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
        value = parseFloat(value);
      } else if (!findValueType(value) && complex.test(target)) {
        value = getAnimatableNone2(key, target);
      }
      this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
    }
    return isMotionValue(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    var _a;
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps(this.props, initial, (_a = this.presenceContext) === null || _a === void 0 ? void 0 : _a.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
};

// node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
};

// node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML;
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
};

// node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = createBox;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps2(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
};

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = (Component3, options) => {
  return isSVGComponent(Component3) ? new SVGVisualElement(options) : new HTMLVisualElement(options, {
    allowProjection: Component3 !== Fragment3
  });
};

// node_modules/framer-motion/dist/es/render/components/motion/create.mjs
var createMotionComponent = /* @__PURE__ */ createMotionComponentFactory({
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout
}, createDomVisualElement);

// node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs
var motion = /* @__PURE__ */ createDOMMotionComponentProxy(createMotionComponent);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
import { forwardRef as forwardRef3, createElement as createElement3 } from "react";

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/Icon.js
import { forwardRef as forwardRef2, createElement as createElement2 } from "react";

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = forwardRef2(
  ({
    color: color2 = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return createElement2(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color2,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement2(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component3 = forwardRef3(
    ({ className, ...props }, ref) => createElement3(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component3.displayName = `${iconName}`;
  return Component3;
};

// node_modules/lucide-react/dist/esm/icons/arrow-down.js
var __iconNode = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
var ArrowDown = createLucideIcon("ArrowDown", __iconNode);

// node_modules/lucide-react/dist/esm/icons/check.js
var __iconNode2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
var Check = createLucideIcon("Check", __iconNode2);

// node_modules/lucide-react/dist/esm/icons/chevron-down.js
var __iconNode3 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
var ChevronDown = createLucideIcon("ChevronDown", __iconNode3);

// node_modules/lucide-react/dist/esm/icons/circle-alert.js
var __iconNode4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
var CircleAlert = createLucideIcon("CircleAlert", __iconNode4);

// node_modules/lucide-react/dist/esm/icons/clock.js
var __iconNode5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
var Clock = createLucideIcon("Clock", __iconNode5);

// node_modules/lucide-react/dist/esm/icons/heart.js
var __iconNode6 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
var Heart = createLucideIcon("Heart", __iconNode6);

// node_modules/lucide-react/dist/esm/icons/info.js
var __iconNode7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
var Info = createLucideIcon("Info", __iconNode7);

// node_modules/lucide-react/dist/esm/icons/smile.js
var __iconNode8 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
];
var Smile = createLucideIcon("Smile", __iconNode8);

// node_modules/lucide-react/dist/esm/icons/sparkles.js
var __iconNode9 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
var Sparkles = createLucideIcon("Sparkles", __iconNode9);

// node_modules/lucide-react/dist/esm/icons/star.js
var __iconNode10 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
var Star = createLucideIcon("Star", __iconNode10);

// src/context/LangContext.jsx
import React3, { createContext as createContext7, useContext as useContext9, useState as useState2 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var LangContext = createContext7(null);
function LangProvider({ children }) {
  const [lang, setLang] = useState2("en");
  return /* @__PURE__ */ jsx6(LangContext.Provider, { value: { lang, setLang }, children });
}
function useLang() {
  const ctx = useContext9(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

// src/translations.js
var translations = {
  en: {
    // ── index.html ────────────────────────────────────────────────────────
    pageTitle: "Mariia Vatseba Sugaring Bristol",
    // ── Navbar ────────────────────────────────────────────────────────────
    nav: {
      about: "About",
      whySugaring: "Why Sugaring",
      prices: "Prices",
      courses: "Courses",
      careGuide: "Care Guide",
      reviews: "Reviews",
      faq: "FAQ",
      contact: "Contact",
      bookNow: "Book Now",
      language: "Language",
      switchToUkrainian: "Switch to Ukrainian",
      switchToEnglish: "Switch to English",
      closeMenu: "Close menu",
      openMenu: "Open menu",
      logoAlt: "Mariia Vatseba"
    },
    // ── Hero ──────────────────────────────────────────────────────────────
    hero: {
      eyebrow: "Mariia Vatseba",
      headingLine1: "Sugaring",
      headingLine2: "Bristol",
      quote: "A woman's body holds so much power and energy. I am the person who purifies the body, restoring its lightness, love, tenderness, and an incredible sense of confidence.",
      paragraph1: "I invite you to experience my sugaring treatments \u2014 it is a true spa experience because, alongside hair removal, it provides a delicate skin exfoliation. For me, every treatment is all about the woman herself: her transformation, her sensations, her individuality, and the unique beauty of her body, which I enhance through my craft.",
      paragraph2: "I truly love what I do, and I believe that true art can only be created out of love. If this approach resonates with you, I'd love to welcome you \u2764\uFE0F\u200D\u{1F525}",
      ctaBook: "Book Your Session",
      ctaAbout: "About Me",
      scroll: "Scroll",
      pauseVideo: "Pause video",
      playVideo: "Play video"
    },
    // ── About ─────────────────────────────────────────────────────────────
    about: {
      eyebrow: "About Me",
      heading: "Mariia Vatseba",
      subtitle: "Sugaring Specialist",
      paragraph1: "Hi, I'm Mariia \u{1F603} \u2014 a sugaring specialist, ukrainian woman, and someone who truly loves what she does. I'm 31, and I'm raising my two beautiful girls, Yeva and Yana, on my own. They are my whole world and my biggest motivation every single day. Our story hasn't always been easy \u2014 I arrived in the UK with a one-month-old baby, born during the war in Ukraine. That journey taught me just how precious safety, peace, and taking care of yourself really are.",
      paragraph2: "I found sugaring when my eldest was little and I needed a career that let me be there for her. What started as a practical choice quietly turned into the greatest love of my professional life. Eight years later, it is so much more than a job to me. With a background in Finance, Economics, and academic research, I've always cared deeply about doing things properly and explaining them clearly \u2014 and that shows in everything I create, from my treatments to my courses.",
      paragraph3: "I truly believe that sugaring is a beautiful act of self-care \u2014 a little ritual that's just for you. When you come to me, I want you to feel welcome, relaxed, and looked after from the very first moment. It makes me so happy to play even a small part in your confidence and your glow. I'm so glad you're here.",
      stat1Label: "Years Of Experience",
      stat2Label: "International Championship Winner",
      stat3Label: "Happy Clients",
      stat4Label: "Smooth Skin Guarantee",
      quoteHeading: '"I experience it myself, and I will teach your body to feel just as luxurious"',
      secondParagraph1: "I have chosen this method for myself every single month for over 8 years. For me, it is all about feeling renewed, fresh, clean, luxurious, and immaculately groomed. It is the exact moment when the entire body resets, a new inner state clicks into place, and I feel ready to take on the world differently.",
      secondParagraph2: "Furthermore, sugaring is a treatment that alters the structure and quantity of your hair. You lose 30\u201340% of the density after the very first time, and the hair grows back thinner, lighter, and softer. Over time, it stops growing altogether in certain areas, giving you a natural 'laser effect' without any machine intervention.",
      secondParagraph3: "This is what I value most. Our bodies support us every single day, and I am so happy to give mine the gentle care it deserves. It is this exact feeling of self-love, lightness, and confidence that I share with my clients each and every day."
    },
    // ── Why Sugaring ──────────────────────────────────────────────────────
    why: {
      eyebrow: "The Method",
      heading: "Why Sugaring?",
      subtext: "Sugaring is a 100% natural, organic hair removal method using sugar paste. To me, it is far more than just hair removal\u2014it is a luxurious self-care spa ritual.",
      benefit1Title: "Organic Spa Care",
      benefit1Desc: "Our paste contains 0% chemicals and completely eliminates the risk of burns or damage. The treatment doubles as a delicate skin peel, gently exfoliating away dead skin cells to leave your skin feeling incredibly soft, smooth, and velvety to the touch.",
      benefit2Title: "Natural 'Laser Effect'",
      benefit2Desc: "You lose 30\u201340% of hair density after your very first session. Hair grows back thinner and lighter, eventually stopping altogether in certain areas. This timeline is completely unique to every individual\u2014taking anywhere from one year to a few years.",
      benefit3Title: "Absolute Safety",
      benefit3Desc: "Applied at a comfortable body temperature, it is exceptionally gentle for sensitive skin, pregnancy, varicose veins, or stretch marks.",
      benefit4Title: "An Inner Reset",
      benefit4Desc: "It is that exact moment in your month when your entire body resets, leaving you with a beautiful sense of lightness, confidence, and self-love.",
      closingQuote: '"I experience it myself, and I will teach your body to feel just as luxurious"'
    },
    // ── What Sets Apart ───────────────────────────────────────────────────
    apart: {
      eyebrow: "What Sets Me Apart",
      heading: "A Different Level of Care",
      paragraph1: "I specialise in Sugaring\u2014an ultra-safe, natural method that is incredibly kind to even the most sensitive skin.",
      paragraph2: "Perfect for clients who value privacy, comfort, exceptional care, quality and a cosy atmosphere\u2014choosing nothing less than the best for their skin.",
      feature1Title: "Zero Risk of Burns",
      feature1Desc: "Applied at a comfortable room temperature.",
      feature2Title: "A Gentle, Mindful Touch",
      feature2Desc: "My techniques are entirely tailored to you.",
      feature3Title: "More Than Hair Removal",
      feature3Desc: "It's a luxurious SPA-style exfoliation that leaves your skin feeling silky-soft and glowing."
    },
    // ── Beauty Space ──────────────────────────────────────────────────────
    space: {
      eyebrow: "The Studio",
      heading: "A Warm Welcome to My Beauty Space",
      paragraph1: "I believe that a sugaring appointment should be a relaxing escape, not a chore. That is why I have created a serene, private space where comfort, absolute hygiene, and luxury meet.",
      paragraph2: "Every single detail of my workspace is meticulously curated. From the warm ambient lighting and soft linen sheets to medical-grade sanitization, you can unwind knowing you are in safe, caring hands.",
      highlight1Title: "Hospital-Grade Hygiene",
      highlight1Desc: "100% disposable materials, medical-grade sanitization of surfaces, and pristine sterile instruments.",
      highlight2Title: "Cozy & Private Ambience",
      highlight2Desc: "A quiet, warm room with calming music, soft linens, and gentle lighting designed for your complete relaxation.",
      highlight3Title: "Premium Natural Cosmetics",
      highlight3Desc: "Using only the finest organic sugar pastes and botanical skin care to pamper and nourish your skin.",
      imageHover1: "Cozy Treatment Room",
      imageHover2: "Good Quality Products",
      imageHover3: "Clean Materials",
      imageAlt1: "Clean and cozy treatment room",
      imageAlt2: "Good quality products",
      imageAlt3: "Clean materials"
    },
    // ── Before & After ────────────────────────────────────────────────────
    beforeAfter: {
      eyebrow: "Real Results",
      heading: "Before & After",
      subtext: "Swipe or use the arrows to see the transformative results of professional sugaring. Click any image to view details.",
      scrollLeft: "Scroll left",
      scrollRight: "Scroll right",
      placeholderLabel: "Before & After Photo",
      closeDetails: "Close details"
    },
    // ── Services ──────────────────────────────────────────────────────────
    services: {
      eyebrow: "Services & Prices",
      heading: "Price List",
      inclusionsLabel: "Included in every visit",
      inclusion1Title: "Professional Skin Consultation",
      inclusion1Desc: "A detailed analysis of your skin's current condition before we begin.",
      inclusion2Title: "Bespoke Expert Advice",
      inclusion2Desc: "Personalised home-care recommendations to keep your skin radiant between visits.",
      inclusion3Title: "Luxury Aftercare",
      inclusion3Desc: "Premium cosmeceuticals and delicate spa-exfoliation techniques applied during your session.",
      tabBikini: "Bikini",
      tabUpper: "Upper Body",
      tabDown: "Down Body",
      tabFace: "Face",
      // Bikini
      bikiniFullLabel: "Bikini & Intimate Sugaring",
      bikiniTagline: "My most-requested treatments \u2014 designed for total confidence and comfort.",
      bikiniService1Name: "Hollywood",
      bikiniService1Badge: "Most Popular",
      bikiniService1Duration: "40 min \u2013 1 hour",
      bikiniService1Desc: "Complete hair removal from front to back for a perfectly smooth finish. Ideal if you prefer a fully bare, long-lasting result.",
      bikiniService2Name: "Brazilian",
      bikiniService2Duration: "40 min \u2013 1 hour",
      bikiniService2Desc: "Full hair removal but with a small strip or triangle on the front if you prefer to leave something. If you want a stylised and natural look choose this option.",
      bikiniService3Name: "G-String / Extended Bikini",
      bikiniService3Duration: "30 \u2013 40 min",
      bikiniService3Desc: "Targets hair outside the bikini line and slightly deeper for a neat, more defined shape. Perfect for higher-cut underwear or swimwear.",
      bikiniService4Name: "Basic Bikini Line",
      bikiniService4Duration: "20 \u2013 30 min",
      bikiniService4Desc: "Removes hair along the sides of the bikini line for a clean and tidy appearance. Quick, simple, and perfect for beginners.",
      bikiniAddonGroupName: "Add-ons",
      bikiniAddon1Name: "Extra Long Hair & Extended Intervals",
      bikiniAddon1Desc: "Applies if it's been over 4 weeks since shaving or 7\u20138 weeks since your last professional treatment. The fee reflects the extra time and technique involved \u2014 but rewards you with a much longer-lasting result. Please let me know your hair length before your visit.",
      bikiniAddon1ExtendedDesc: "The Rule: The additional fee applies if it has been over 4 weeks since shaving, or over 7\u20138 weeks since your last professional treatment.\n\nWhy? Working with longer hair or extended gaps requires extra time and meticulous technique.\n\nYour Benefit: A wonderful advantage of this session is a longer-lasting result, as we thoroughly remove the maximum volume of hairs that have appeared.\n\nMaintenance: The standard regular interval for maintenance is 4\u20135\u20136 weeks. Please kindly let me know about your hair length beforehand so I can guide you. The cost is adjusted individually based on time and complexity.",
      bikiniAddon2Name: "Extra Patch",
      bikiniAddon2Desc: "For small stray hairs or minor spots outside the standard menu \u2014 e.g. a few dark hairs on the back of the thighs, or a small partial patch on the butt cheeks.",
      bikiniAddon2ExtendedDesc: "The Rule: Designed specifically for clearing small, stray hairs or minor individual spots outside our standard menu.\n\nPlease Note: Standard bikini treatments do not include the butt cheeks or hair growing on the thighs beyond 4 fingers' width.\n\nWhen to book: If you need to add a small custom area (e.g., single dark stray hairs on the back of the thighs, or a small partial patch slightly deeper onto the butt cheeks without clearing the full buttocks).",
      bikiniAddon3Name: "Belly Line",
      bikiniAddon3Desc: "A neat single line of hair removal from the navel downwards.",
      // Upper Body
      upperFullLabel: "Upper Body Sugaring",
      upperTagline: "Silky femininity \u2014 from your fingertips to your shoulders.",
      upperService1Name: "Underarms",
      upperService1Duration: "10 \u2013 15 min",
      upperService1Desc: "Complete hair removal for the underarm area, ensuring clean, fresh, and smooth skin.",
      upperService2Name: "Full Arms",
      upperService2Duration: "1 hour",
      upperService2Desc: "Total hair removal from the shoulders down to the wrists, including the hands.",
      upperService3Name: "Half Arms",
      upperService3Duration: "30 \u2013 40 min",
      upperService3Desc: "Hair removal from the elbow down to the tips of your fingers, with the elbow fully included in the service.",
      upperService4Name: "Stomach",
      upperService4Duration: "15 \u2013 20 min",
      upperService4Desc: "Full hair removal across the abdomen area, leaving the skin perfectly clear and smooth.",
      upperAddon1Name: "Nipple Area",
      upperAddon1Duration: "5 \u2013 10 min",
      upperAddon1Desc: "Gentle and precise hair removal immediately around the nipple zone.",
      upperAddon2Name: "Fingers Only",
      upperAddon2Duration: "5 \u2013 10 min",
      upperAddon2Desc: "Quick and precise hair removal strictly for the fingers on both hands.",
      // Down Body
      downFullLabel: "Down Body Sugaring",
      downTagline: "From your waist to your toes \u2014 effortlessly and beautifully smooth.",
      downService1Name: "Full Legs (Includes Toes)",
      downService1Duration: "1 \u2013 1.5 hours",
      downService1Desc: "Total hair removal from the very top of the thighs down to the tips of your toes. Please note: this service does not include bikini line hair removal.",
      downService2Name: "Half Legs (Includes Toes)",
      downService2Duration: "30 \u2013 45 min",
      downService2Desc: "Your choice of either Lower Legs (from the knee down to the tips of your toes) or Upper Legs (the thighs down to the knee).",
      downService3Name: "Buttocks",
      downService3Duration: "15 \u2013 20 min",
      downService3Desc: "Full hair removal across the buttocks area, leaving the skin perfectly smooth and silky.",
      downService4Name: "Lower Back",
      downService4Duration: "15 \u2013 20 min",
      downService4Desc: "Precise hair removal covering the lower lumbar area, from the waistline down to the top of the buttocks.",
      downService5Name: "Lower Back + Buttocks Combo",
      downService5Badge: "Package Deal",
      downService5Duration: "30 \u2013 40 min",
      downService5Desc: "A cost-effective treatment combining both the lower back and the buttocks for a completely smooth silhouette.",
      downAddon1Name: "Toes only",
      downAddon1Duration: "10 min",
      downAddon1Desc: "A quick, standalone treatment to remove hair strictly from the tops of the feet and toes.",
      // Face
      faceFullLabel: "Face Sugaring",
      faceTagline: "Precise, gentle sugaring for every delicate facial zone.",
      faceGroupIndividual: "Individual Zones",
      faceService1Name: "Upper Lip",
      faceService1Duration: "15\u201320 min",
      faceService1Desc: "Removal of fine fuzz and coarse hair above the lip.",
      faceService2Name: "Chin",
      faceService2Duration: "10\u201315 min",
      faceService2Desc: "Hair removal from the chin and just under the jawline.",
      faceService3Name: "Nose Pores",
      faceService3Duration: "15-20 min",
      faceService3Desc: "Deep sugar cleanse to clear blackheads from the nose surface.",
      faceService4Name: "Nostrils",
      faceService4Duration: "15-20 min",
      faceService4Desc: "Removal of all hair inside the nostrils. It is not just about aesthetics, it is about making it much easier for you to breathe.",
      faceService5Name: "Eyebrows",
      faceService5Duration: "30\u201340 min",
      faceService5Desc: "Tidying around the eyebrows using sugar paste. Creates a clean framing effect that makes your natural brows look sharper and more defined.",
      faceService6Name: "Sideburns",
      faceService6Duration: "20-25 min",
      faceService6Desc: "Hair removal around the ears and along the jawline.",
      faceService7Name: "Neck",
      faceService7Duration: "15-20 min",
      faceService7Desc: "Removal of unwanted hair on the front and sides of the neck.",
      faceService8Name: "Nape Area",
      faceService8Duration: "15-20 min",
      faceService8Desc: "Creating a clean, defined hairline. Removes all fine, short hair and peach fuzz to make your haircut or updo look absolutely flawless.",
      faceGroupCombos: "Mini Combos",
      faceCombo1Name: "Combo 1 \u2014 Lower Face Care",
      faceCombo1Badge: "Most Popular",
      faceCombo1Duration: "25\u201330 min",
      faceCombo1Desc: "(Upper Lip + Chin) \u2014 Our most requested combination for flawless smoothness.",
      faceCombo2Name: "Combo 2 \u2014 Complete Nose Care",
      faceCombo2Duration: "30\u201335 min",
      faceCombo2Desc: "(Nose Pores + Nostrils) \u2014 Deep outer pore cleanse combined with inner hair removal.",
      faceCombo3Name: "Combo 3 \u2014 T-Zone Treatment",
      faceCombo3Duration: "40\u201345 min",
      faceCombo3Desc: "(Eyebrows + Nose Pores) \u2014 An effective duo package covering expert eyebrow shaping and pore cleansing.",
      faceCombo4Name: "Combo 4 \u2014 Perfect Facial Contour",
      faceCombo4Badge: "Special Offer",
      faceCombo4Duration: "35\u201340 min",
      faceCombo4Desc: "(Upper Lip + Chin + Sideburns) \u2014 A comprehensive package tailored for a completely smooth and neat contour.",
      faceGroupPremium: "Premium Packages",
      facePremium1Name: "Premium 1 \u2014 Full Facial Care",
      facePremium1Duration: "1.5\u20132 hrs",
      facePremium1Desc: "(Full Face + Eyebrows) \u2014 Total smoothness across all areas, expert eyebrow shaping, and professional care with a soothing mask.",
      facePremium2Name: "Premium 2 \u2014 Ultimate Refresh: Face & Nape",
      facePremium2Duration: "2-2.5 hrs",
      facePremium2Desc: "(Full Face + Nape Area) \u2014 Flawless face, eyebrow shaping, and a defined hairline combined with professional care and a mask.",
      facePremium3Name: "Premium 3 \u2014 Royal Smoothness: Face & Neck",
      facePremium3Duration: "2-2.5 hrs",
      facePremium3Desc: "(Full Face + Neck) \u2014 Seamless smoothness for the face, eyebrows, and neck area, completed with professional care and a soothing mask.",
      // Face care guide
      faceCareGuideToggle: "Important Information About Facial Sugaring",
      faceGuideIntro1: "Facial hair removal requires an incredibly delicate touch. When working with this sensitive area, I use my own signature, highly gentle method. It is much safer and kinder to your skin than traditional techniques.",
      faceGuideIntro2: "With 8 years of professional experience, I know exactly how much care this zone deserves. For me, this is never just a simple process of application and removal. It is a mindful sequence of steps tailored precisely to the unique condition of your skin on the day of your visit.",
      faceGuideIntro3: "Every session is also a premium skincare treatment. I incorporate luxury professional products, soothing masks, and creams chosen specifically for you. Because of this dedicated care, my treatments take a little longer than what you might find in standard salons. This service is designed for those who value a truly bespoke approach and refuse to settle for anything less than the best for their skin.",
      faceGuideSection1Heading: "\u2728 The Magic of Sugar Paste: More Than Just Hair Removal",
      faceGuideSection1Para1: "Sugar paste is a truly remarkable material that works wonders on the delicate facial area. It deeply cleanses the skin and clears facial pores from blackheads in a way no other professional product can match. Because of this, my clients usually fall into two categories:",
      faceGuideSection1Bullet1: "Those who come for flawless smoothness and complete hair removal.",
      faceGuideSection1Bullet2: "Those who choose this treatment as a deep facial cleanse to instantly restore freshness, youthfulness, and a completely renewed glow.",
      faceGuideSection1Para2: "The best part? No matter your main goal, you always get the perfect combination of both benefits! This is an absolute favorite treatment among my clients. It leaves you feeling incredibly inspired to care for your skin, and your daily at-home skincare routines (creams, serums) will become significantly more effective, as your deeply purified skin can finally absorb all the nutrients.",
      faceGuideSection1Quote: `"I am absolutely in love with this feeling, and I regularly do facial sugaring on myself. Every single time, it is a true 'wow' moment! I look in the mirror and think: 'Is this really my skin? It feels as incredibly soft and tender as my daughter's.' You will absolutely fall in love with your reflection and enjoy every single touch!"`,
      faceGuideSection2Heading: "\u{1F4A1} What You Need to Know Before Your Facial Treatment",
      faceGuideItem1Strong: "Timing your first visit:",
      faceGuideItem1Text: "If you are booking a Full Face treatment for the very first time, please schedule your appointment 5 to 7 days before any important event. If you have had facial waxing or sugaring before and know how your skin responds, 2 to 3 days in advance is perfect.",
      faceGuideItem2Strong: "Understanding skin reactions:",
      faceGuideItem2Text: "Sugaring gently exfoliates the skin, so temporary redness is completely normal. While my signature technique is designed to minimize trauma, a first-time treatment can sometimes trigger tiny white bumps. This is a natural, individual response from your body. They clear up on their own, and I will always guide you on how to make them disappear quickly.",
      faceGuideItem3Strong: "The power of routine:",
      faceGuideItem3Text: "With regular appointments, your skin adapts. If you experienced minor breakouts after your first visit, they usually significantly decrease or do not appear at all by the second time.",
      faceGuideItem4Strong: "Prone to breakouts? Your safety comes first:",
      faceGuideItem4Text: "Some clients notice a few minor spots after treating even a tiny zone, regardless of whether wax or sugar is used. This is simply how their skin naturally reacts to the extraction process, driven by internal triggers. While professional products minimize this effect, clients who are prone to this usually know their skin well, expect this reaction, and independently choose what they prioritize right now: hair-free skin or managing a brief 1\u20132 day breakout.\n\nPlease note that I do not work with skin in the active stages of acne or severe post-acne. If your skin is prone to breakouts, we can safely perform a targeted treatment strictly in areas free of inflammation on the day of your visit (such as just the eyebrows, upper lip, or chin). For your ultimate safety, the specific zone being treated must be completely free of active breakouts. If it is just a single, occasional spot (e.g., a hormonal breakout), I will simply and carefully work around it.",
      faceGuideItem5Strong: "Start small:",
      faceGuideItem5Text: "If you feel nervous, I highly recommend starting with a smaller zone first. This allows you to experience the treatment, see how beautifully your skin changes, and monitor how your body reacts. We can always add more zones during your next visit!",
      faceGuideSendPhotoNote: "Please send me a photo of your skin before booking. I am always happy to consult and guide you! I share this not to overwhelm you, but to ensure you feel confident, safe, and fully informed.",
      faceGuideSection3Heading: "\u2728 Post-Treatment Care & What to Expect",
      faceGuideSection3Intro: "The facial area is very delicate, making a temporary skin reaction completely natural. Everyone is beautifully unique: for some, the skin settles within just 20\u201330 minutes after regular treatments, while others might need 1.5 to 2 days. To help your skin heal beautifully and prevent any irritation, please follow these simple steps after your visit:",
      faceGuideAftercare1Strong: "Sun protection:",
      faceGuideAftercare1Text: "Always apply SPF before heading outside to protect your fresh skin, regardless of whether it is sunny or cloudy.",
      faceGuideAftercare2Strong: "Take it easy:",
      faceGuideAftercare2Text: "If possible, enjoy a quiet, relaxing day after your appointment without rushing through a busy to-do list. Give your skin a day or two of relative calm.",
      faceGuideAftercare3Strong: "Keep it clean:",
      faceGuideAftercare3Text: "Avoid touching your face with unwashed hands or your phone screen.",
      faceGuideAftercare4Strong: "Avoid skin friction:",
      faceGuideAftercare4Text: "Avoid close contact with beards or rough stubble, as this can easily irritate freshly treated skin.",
      faceGuideAftercare5Strong: "Fresh pillowcase:",
      faceGuideAftercare5Text: "Put a clean pillowcase on your bed for the night. A dirty surface is often the hidden reason for breakouts on just one side of the face.",
      faceGuideAftercare6Strong: "Skip the makeup:",
      faceGuideAftercare6Text: "Give your skin a break from makeup until any redness or reaction completely settles.",
      faceGuideClosingNote: "Please remember: if you ever notice a little breakout or have any questions, don't panic! I am always just a message away and ready to guide you on what to do.",
      faceGuideClosingCta: "If you have any questions left about facial treatments, feel free to drop me a message \u2014 I'll be absolutely happy to help!",
      // Duration notes
      durationToggle: "About Treatment Durations",
      durationIntro: "The time shown next to each service is the maximum expected duration. In your specific case, it may well be much quicker. Every step of my work is focused on meticulous quality and your absolute comfort.",
      durationNote1Title: "How I Work",
      durationNote1Desc: "My expertise lies in performing hair removal with minimal discomfort and zero skin trauma \u2014 to the absolute greatest extent possible in your individual case.",
      durationNote2Title: "Bespoke Technique",
      durationNote2Desc: "My experience allows me to custom-select paste density and technique just for you \u2014 my actions always depend on the live condition of your skin during your visit.",
      durationNote3Title: "No Client Conveyor Belt",
      durationNote3Desc: "I do not operate on a high-volume, rushed schedule. Every treatment perfectly matches your individual needs in a calm, stress-free atmosphere.",
      durationNote4Title: "Individual Factors",
      durationNote4Desc: "Hair length, density, volume, and complexity all affect duration. For your very first visit, please plan around the maximum indicated time.",
      durationNote5Title: "Time Savings with Combos",
      durationNote5Desc: "Combining multiple zones into a single session will often be quicker than booking each zone separately.",
      durationNote6Title: "Flexibility for Your Schedule",
      durationNote6Desc: "If speed is your priority today, let me know in advance. Your safety and results always come first.",
      servicesBottomQuote: `"Not sure which service is right for you? I'm always here to guide you."`,
      servicesBottomCta: "Ask Me a Question"
    },
    // ── Courses ───────────────────────────────────────────────────────────
    courses: {
      eyebrow: "Education & Courses",
      headingLine1: "Want to do this yourself?",
      headingLine2: "I'll teach you everything.",
      subtext: "My courses offer far more than just dry theory\u2014they are a complete, carefully structured system designed to lead my students directly to success. Teaching is where I truly thrive and come alive.",
      card1Badge: "In-Person \xB7 Bristol",
      card1Title: "For Professionals",
      card1Desc: "Heartfelt beginners' courses and advanced masterclasses for practicing therapists looking to elevate their skills to a premium level. Perfect for those starting from zero or experienced specialists who want to reach the next tier.",
      card1Tag1: "One-to-One",
      card1Tag2: "Intensive Training",
      card2Badge: "In-Person \xB7 Bristol",
      card2Title: "For Yourself",
      card2Desc: "Cosy training designed for women who want to master the skill of professional sugaring for their personal home care. Because I teach strictly on a one-to-one basis, you will immediately receive only the exact details and techniques that will work flawlessly for your specific skin and hair type.",
      card2Tag1: "One-to-One",
      card2Tag2: "Personalised",
      onlineBadge: "Online Academy",
      onlineHeading: "Personal Sugaring At Home",
      onlineParagraph1: 'Two years ago, I launched my very first online course: "The Essentials of Personal Sugaring"\u2014specifically created for those who want to master the exact nuances of professional hair removal at home.',
      onlineParagraph2: "Today, over 19 successful students worldwide have graduated from this course. It is an incredible investment in oneself, and I am absolutely thrilled to see my dream of global education coming to life.",
      stat1Label: "Global Students",
      stat2Label: "Success Rate",
      videoAlt: "Mariia Vatseba teaching a sugaring course"
    },
    // ── Care Guide ────────────────────────────────────────────────────────
    care: {
      eyebrow: "Skin Care",
      heading: "The Care Guide",
      subtext: "To guarantee baby-smooth skin, minimal discomfort, and a luxurious spa result, follow these simple preparation and aftercare recommendations.",
      beforeTitle: "Before Sugaring",
      beforeSubtitle: "Preparation Rules",
      before1Title: "Ideal Hair Length",
      before1Desc: "For the most comfortable treatment, hair should be about 5-7 mm long (typically 2-3 weeks after your last shave).",
      before2Title: "Gentle Exfoliation",
      before2Desc: "Exfoliate the area gently 24 hours before your session. This lifts flat hairs and removes dead skin cells for easier removal.",
      before3Title: "Clean, Bare Skin",
      before3Desc: "Arrive with clean skin. Please do not apply rich body creams, lotions, or oils on the treatment day as they block the paste.",
      before4Title: "Avoid Tanning",
      before4Desc: "Avoid sunbathing, tanning beds, and fake tan application for at least 24-48 hours prior to your treatment.",
      afterTitle: "After Sugaring",
      afterSubtitle: "Aftercare Rules",
      after1Title: "Breathable Clothing",
      after1Desc: "Wear loose-fitting, soft cotton underwear and clothing. Tight synthetic fabrics trap friction and sweat, leading to irritation.",
      after2Title: "Avoid Heat & Exercise",
      after2Desc: "For the first 24-48 hours, skip heavy gym workouts, hot baths, steam rooms, saunas, and swimming pools.",
      after3Title: "No Harsh Products",
      after3Desc: "Do not apply perfumed lotions, deodorants, self-tans, makeup, or active chemical skin treatments on the treated area.",
      after4Title: "Hydration & Exfoliation",
      after4Desc: "Start moisturizing daily after 24 hours. Begin gentle skin exfoliation 3-4 days post-treatment to prevent ingrown hairs.",
      closingQuote: `"Your skin is your body's shield and your signature accessory. Treat it with kindness, love, and professional care."`
    },
    // ── Testimonials ──────────────────────────────────────────────────────
    testimonials: {
      eyebrow: "Reviews",
      heading: "Kind Words from My Clients",
      closingQuote: '"Words like these are more than just a review\u2014they are a true reward."'
    },
    // ── FAQ ───────────────────────────────────────────────────────────────
    faq: {
      eyebrow: "FAQ",
      heading: "Frequently Asked Questions",
      cat1Name: "Preparation & Booking",
      cat1Q1: "How long does my hair need to be for sugaring?",
      cat1A1: "For the best results, your hair should be about the length of a grain of rice (around 5-7mm). If you are switching from shaving, here is the ideal growth time required for each area:\nUnderarms: 10\u201314 days of growth.\nBikini / Hollywood: 12\u201316 days of growth.\nLegs: 2\u20133 weeks (2 weeks is plenty for lower legs, but thighs grow back much slower after shaving, so 3 weeks is best for full legs)",
      cat1Q2: "I have a holiday planned and don't have enough time to grow my hair. Can I still get sugared?",
      cat1A2: "Yes, absolutely! We can still do the treatment. The absolute minimum growth times required for an emergency or holiday booking are:\nUnderarms: 7 days.\nBikini: 12 days.\nLegs: 8-12 days.\n\nIn these cases, I will always do my absolute best to give you the cleanest finish possible. It is still a much better option than shaving for your holiday! However, please keep in mind that some tiny hairs might just be starting to break through the skin, which means I physically won't be able to catch them. I have extensive experience working with short hair\u2014even managing underarms with just 5 days of growth post-shave or legs with 7 days. It will be perfect for your holiday, but to experience the full, flawless benefit of sugaring, I highly recommend sticking to the standard guidelines above next time!",
      cat1Q3: "What if my hair is much longer than 2\u20133 weeks? Can I still book a session?",
      cat1A3: "Yes, you can. I regularly work with clients who have longer hair growth. Please note that the treatment may feel slightly more intense because more hairs will be removed at once. However, the result will exceed your expectations because we will catch a larger volume of hair, meaning your smooth results will last even longer!\n\nImportant Note: If your hair is significantly longer, please let me know in advance. I will need to allocate extra time for your appointment, and a surcharge of +\xA35 to \xA330 will apply depending on the time and complexity. Please do not trim the hair yourself at home, as it is very easy to cut it too short (especially in the bikini area). If you feel you must tidy it up, you can use a trimmer gently to leave a consistent length of 5\u20137mm.",
      cat1Q4: "What should I do before my appointment?",
      cat1A4: "You can gently exfoliate the area 5 days before your scheduled appointment. On the day of your treatment, please make sure to take a shower. If you are coming straight from work, don't worry at all\u2014intimate wet wipes will be available for you to use right before we begin.\n\nKey recommendations based on the area:\n\nFacial Sugaring: Please do not wear any makeup or cosmetic products on the day of your visit, as this directly impacts the overall quality of the treatment. If you do happen to be wearing makeup, please don't worry\u2014I will thoroughly cleanse your skin before we start and do everything I can to ensure a beautiful result. However, these small details do make a difference, so it is always best to prepare in advance.\n\nGeneral Rule: Please avoid applying any thick lotions, body oils, or deodorants to the areas being treated on the day of your appointment.\n\nI also highly recommend wearing or bringing comfortable, loose-fitting clothing, preferably made from natural fabrics. This allows your skin to breathe and minimises any post-treatment friction or irritation.",
      cat1Q5: "I'm going on holiday soon. When should I book my sugaring appointment?",
      cat1A5: "Booking your session 2 to 3 days before you travel is ideal. Your skin needs 24 to 48 hours to fully recover before any sun exposure, swimming, or sauna use.\n\nImportant note for facial treatments: The face is a highly delicate zone and requires more time to recover. If it is your very first time getting facial sugaring, I highly recommend booking it 5 to 7 days before your important event or holiday. For regular clients, booking 3 days in advance is perfect!",
      cat2Name: "The Experience & Conditions",
      cat2Q1: "Does sugaring hurt?",
      cat2A1: "Because the sugar paste only sticks to the hair and dead skin cells\u2014not live skin\u2014it is significantly less painful than traditional waxing.\n\nAs women, we all experience pain very differently; some of us have a high pain threshold, while others are more sensitive. My signature technique ensures that any slight discomfort is felt only at the exact second the hair is removed\u2014lasting just a brief moment.\n\nMany of my clients are genuinely surprised by how different and incredibly comfortable my method is compared to past experiences. This is because I have studied the mechanics of hair removal deeply and master all the technical nuances that lower skin sensitivity. Simply put, I know how to make the process as painless as humanly possible.\n\nOf course, your individuality plays a major role too. Every client responds differently: some find it so relaxing they want to sleep, while others just need a brief moment to focus. Rest assured, it gets easier with every single session as the hair becomes much thinner and softer!\n\nTop tips to help you schedule your visit for maximum comfort:\n\nTrack your menstrual cycle. Generally, women tend to be more sensitive right before their period and during ovulation. The absolute best, most comfortable time to get treated is usually right after your period ends. However, practice shows that every body operates on its own unique rhythm. Some of my clients actually report feeling the least amount of sensitivity right before or during their cycle. It is all about tuning into your body to see what works best for you.",
      cat2Q2: "Can I get sugared if I am on my period?",
      cat2A2: "Yes, absolutely. Having your period is not a reason to cancel your appointment. I regularly treat clients during this time. All you need to do is wear a fresh tampon or menstrual cup before your session. Please keep in mind that your skin may be slightly more sensitive to pain just before and during your cycle, but the treatment can still be done flawlessly!",
      cat2Q3: "I am pregnant. Can I still book a session?",
      cat2A3: "Yes, absolutely! Sugaring is a 100% natural, organic, and completely safe method for both you and your baby, as the paste contains zero chemicals or toxins. Many of my clients continue their treatments right up until their due date, as it offers incredible comfort, convenience, and a feeling of lightness\u2014especially during those final months.\n\nAs a mother of two daughters myself, I completely understand the unique needs of expectant mums, making pregnant clients a deeply special category for me. The main condition is that your pregnancy is progressing smoothly and your doctor approves.\n\nHowever, here are a few key details to keep in mind:\n\n\u2022 If you are already used to sugaring: You can confidently continue your regular monthly sessions without any breaks. It is entirely safe and will not affect your pregnancy in any negative way.\n\n\u2022 If it is your first time sugaring: You can still absolutely have the treatment. However, during the first trimester, anything brand new can cause minor stress simply because you don't know what to expect. In these cases, I highly recommend waiting until your 12th week to start. We can begin with smaller areas, like the underarms or a basic bikini line, to ease you into the sensation.\n\nPregnancy hormones can initially make your skin a bit more sensitive, so I will take extra care to ensure you are as relaxed and comfortable as possible. Interestingly, practice shows that the closer you get to your due date, the less sensitivity you will feel. Your body is already naturally preparing for childbirth, making your pain threshold much higher!",
      cat2Q4: "I have a lot of moles. Is it safe to have a sugaring treatment?",
      cat2A4: "Yes, it is perfectly safe! The presence of moles is by no means a contraindication for a sugaring treatment.\n\nAny flat moles that do not protrude above the skin and do not have hair growing from them are completely safe to be treated\u2014the sugar paste glides over them smoothly and painlessly.\n\nImportant note about hairs on moles: If there is hair growing directly from a mole, it must never be plucked or pulled out with paste. It can only be carefully trimmed with scissors, or the area can simply be left untouched.\n\nTherefore, if a mole is raised, large, sensitive, or has hair growing from it, I will simply work carefully nearby. Even if it is located in a highly delicate or intimate area (such as the labia in a Hollywood bikini), you can rest completely assured.\n\nI frequently work with clients who have moles, so if you have this specific feature, please be sure to let me know beforehand. My technique and years of expertise allow me to navigate these areas flawlessly, ensuring 100% skin safety, protection, and an immaculate, high-quality finish.",
      cat2Q5: "Can I get sugared if I have varicose veins?",
      cat2A5: "Yes, absolutely! In fact, sugaring is truly the best and safest hair removal method if you have varicose veins. Unlike hot wax, sugar paste is applied at a comfortable body temperature, meaning there is absolutely no heat to dilate your blood vessels or irritate your legs.\n\nThe treatment is incredibly gentle and kind to your skin. If you do have varicose veins, just let me know before your visit. If you have any doubts or worries at all, you are always welcome to send me a photo in a private message, and I will gladly give you a consultation before you book!",
      cat2Q6: "I have stretch marks. Can I still have the treatment?",
      cat2A6: "Yes, absolutely! Having stretch marks is not a barrier at all for a sugaring treatment. However, it is important to know that skin with stretch marks is incredibly delicate, thinner, and carries a higher risk of skin trauma or heightened sensitivity.\n\nBecause of this, these areas require a specialised technique and exceptional care. I am highly trained in working meticulously with sugar paste on delicate skin, ensuring your skin remains completely protected. It is vital to choose your therapist carefully, especially if you have stretch marks in the bikini area.\n\nIn fact, because the sugar paste acts as a gentle spa exfoliation, it leaves the skin looking much smoother, softer, and beautifully hydrated. I am always so proud when my clients with stretch marks mention how light, comfortable, and easy their session felt. You can feel 100% confident knowing you are in safe, expert hands!",
      cat2Q7: "My skin sweats heavily. Is sugaring suitable for me?",
      cat2A7: "Yes, absolutely! Heavy sweating is not a barrier at all. Sugar paste handles this brilliantly and ensures a perfectly smooth finish.\n\nThe treatment might take a little longer, so please make sure to let me know before your visit\u2014I will allocate more time for your appointment to carefully prepare your skin and make everything as comfortable and high-quality as possible for you!",
      cat2Q8: "How old do I have to be for sugaring?",
      cat2A8: "Sugaring is 100% organic and completely safe for teenagers. It is a wonderful option from the moment a young girl feels ready and develops a personal wish to remove unwanted hair. First and foremost, it is incredibly important to me that this is entirely her own choice, as her comfort and confidence come first.\n\nIf you are under 18, we just follow a few gentle guidelines to ensure everything is perfect:\n\n\u2022 Parental Support: For anyone under the age of 18, a parent or guardian needs to accompany her to the first appointment so we can all chat together, answer any questions, and sign a basic consent form.\n\n\u2022 Intimate Care: For teenagers under 18, we focus on a very gentle, basic bikini line treatment (along the underwear line). An extended bikini option is only recommended once her menstrual cycle has naturally regulated and stabilised. Please note that 18 is the minimum age for a full Hollywood or Brazilian treatment.",
      cat3Name: "Aftercare & Maintenance",
      cat3Q1: "Post-Treatment Aftercare Advice",
      cat3A1: "Hair removal is naturally a minor trauma for your hair follicles, which means every action you take after your session is incredibly important.\n\nTo keep your skin beautifully smooth, calm, and healthy, please follow these guidelines for 48 hours after your first appointment or 24 hours if you are a regular client (adjusting to your individual skin recovery time).\n\nWhat to avoid (For 24 to 48 hours):\n\n\u2022 Direct sunlight and sunbeds: Avoid exposing the treated area to the sun, as fresh skin is highly vulnerable to UV rays and can easily develop uneven pigmentation. If the sun is active and you need to go outdoors, you must apply a high-factor SPF 50 sunscreen to protect the newly treated areas.\n\n\u2022 Heat and friction: Avoid saunas, steam rooms, swimming pools, hot baths, intense workouts, and sex\u2014essentially anything that causes heavy sweating or friction on your delicate skin.\n\n\u2022 Harsh products and soaps: Do not apply scented lotions, deodorants, self-tanners, or chemical peels. If needed, you can take a light, lukewarm shower no earlier than 4 hours after your session (this allows the professional aftercare products I applied to fully work their magic). Wash the area with water only\u2014no shower gels or soaps.\n\n\u2022 Synthetics and bacteria: Minimise touching the treated area with your hands (if you must, ensure they are thoroughly clean). Opt for loose clothing and underwear made strictly from natural fabrics like cotton.\n\n\u2022 For facial areas: If we performed facial sugaring, please ensure you sleep on a fresh, clean pillowcase on the night of your treatment.",
      cat3Q2: "What should you do for long-term skin health?",
      cat3A2: "It is no secret that home care makes up 80% of how your skin looks and feels. After all, you spend just one hour a month with me, but you live with your skin every single day.\n\nI provide comprehensive, tailored advice based entirely on your specific skin type during your appointment. I am always here to teach you which products to choose and the correct order to use them in, ensuring you can confidently maintain healthy, radiant skin between your visits.",
      cat3Q3: "How often should I book my appointments?",
      cat3A3: `As a general guide, I recommend booking your treatments every 4 to 5 weeks to achieve that beautiful "natural laser effect" and reduce hair growth quickly.

However, every body is beautifully unique. Hair growth cycles depend on many internal factors, including hormonal balance, medications, contraception, pregnancy, or breastfeeding, which can cause hair to grow much slower. Depending on the specific area and your body's rhythm, your intervals could easily be longer\u2014around 6 to 8 weeks. I am always here to guide you and personalise your schedule so you get the absolute best, longest-lasting results for your skin.`
    },
    // ── Contact ───────────────────────────────────────────────────────────
    contact: {
      eyebrow: "Get in Touch",
      heading: "Book Your Session",
      subtext: "Ready to experience the ultimate in luxury sugaring? Get in touch to book your appointment or ask any questions.",
      locationLabel: "Location",
      locationValue: "Bristol, England",
      locationNote: "Exact address shared upon booking",
      emailLabel: "Email",
      availabilityLabel: "Availability",
      availabilityValue: "By appointment only",
      availabilityNote: "Please message to arrange your preferred time",
      formTitle: "Send a Message",
      nameLabel: "Your Name",
      namePlaceholder: "Sophia Taylor",
      emailFormLabel: "Email",
      emailPlaceholder: "sophia@example.com",
      serviceLabel: "Service of Interest",
      serviceDefault: "Select a service...",
      optgroupBikini: "Bikini & Intimate Sugaring",
      optionHollywood: "Hollywood / Brazilian",
      optionGstring: "G-String / Extended Bikini",
      optionBasicBikini: "Basic Bikini Line",
      optgroupUpper: "Upper Body Sugaring",
      optionUnderarms: "Underarms",
      optionArms: "Full or Half Arms",
      optionStomach: "Stomach",
      optgroupDown: "Down Body Sugaring",
      optionLegs: "Full or Half Legs",
      optionButtocks: "Buttocks & Lower Back",
      optgroupFace: "Face Sugaring",
      optionFaceZones: "Individual Face Zones",
      optionFaceCombos: "Face Combos & Premium Packages",
      optgroupCourses: "Courses & Training",
      optionCoursePro: "Course: For Professionals",
      optionCourseSelf: "Course: For Yourself",
      optionCourseOnline: "Online Course",
      optgroupOther: "Other",
      optionMultiZone: "Multiple Zones / Custom Package",
      optionOther: "Other / General Enquiry",
      messageLabel: "Your Message",
      messagePlaceholder: "Tell me about your skin or any questions you have...",
      submitButton: "Send Message"
    },
    // ── Blog ──────────────────────────────────────────────────────────────
    blog: {
      eyebrow: "Journal",
      heading: "Beauty Insights",
      post1Title: "What is Sugaring & Why Exactly Sugaring?",
      post1Excerpt: "Sugaring is a 100% natural, organic hair removal method using sugar paste. To me, it is far more than just hair removal\u2014it is a luxurious self-care spa ritual.",
      post1Tag: "Education",
      post2Title: "Arm Sugaring is Having a Moment!",
      post2Excerpt: "It's just as highly requested as the bikini line. The post-treatment feeling is second to none\u2014lightness, silkiness, and femininity right down to your fingertips.",
      post2Tag: "Trending",
      readMore: "Read More"
    },
    // ── Footer ────────────────────────────────────────────────────────────
    footer: {
      brandTagline: "With Love to Your Skin. Premium sugaring specialist delivering luxury self-care experiences in Bristol.",
      emailButton: "Email",
      navGroupExplore: "Explore",
      navAbout: "About",
      navServices: "Services & Prices",
      navCourses: "Courses",
      navGroupSupport: "Support",
      navFaq: "FAQ",
      navCareGuide: "Care Guide",
      navContact: "Contact",
      madeWithLove: "Made with",
      madeWithLoveCity: "in Bristol"
    },
    // ── Sticky Button ─────────────────────────────────────────────────────
    sticky: {
      bookNow: "Book Now"
    }
  },
  // ─── UKRAINIAN ─────────────────────────────────────────────────────────────
  ua: {
    pageTitle: "\u041C\u0430\u0440\u0456\u044F \u0412\u0430\u0446\u0435\u0431\u0430 \u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0411\u0440\u0456\u0441\u0442\u043E\u043B\u044C",
    nav: {
      about: "\u041F\u0440\u043E \u043C\u0435\u043D\u0435",
      whySugaring: "\u0427\u043E\u043C\u0443 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433",
      prices: "\u0426\u0456\u043D\u0438",
      courses: "\u041A\u0443\u0440\u0441\u0438",
      careGuide: "\u0413\u0456\u0434 \u0437 \u0434\u043E\u0433\u043B\u044F\u0434\u0443",
      reviews: "\u0412\u0456\u0434\u0433\u0443\u043A\u0438",
      faq: "\u0417\u0430\u043F\u0438\u0442\u0430\u043D\u043D\u044F \u0442\u0430 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0456",
      contact: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438",
      bookNow: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F",
      language: "\u041C\u043E\u0432\u0430",
      switchToUkrainian: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0438 \u043D\u0430 \u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0443",
      switchToEnglish: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0438 \u043D\u0430 \u0430\u043D\u0433\u043B\u0456\u0439\u0441\u044C\u043A\u0443",
      closeMenu: "\u0417\u0430\u043A\u0440\u0438\u0442\u0438 \u043C\u0435\u043D\u044E",
      openMenu: "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043C\u0435\u043D\u044E",
      logoAlt: "\u041C\u0430\u0440\u0456\u044F \u0412\u0430\u0446\u0435\u0431\u0430"
    },
    hero: {
      eyebrow: "\u041C\u0430\u0440\u0456\u044F \u0412\u0430\u0446\u0435\u0431\u0430",
      headingLine1: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433",
      headingLine2: "\u0443 \u0411\u0440\u0456\u0441\u0442\u043E\u043B\u0456",
      quote: "\u0416\u0456\u043D\u043E\u0447\u0435 \u0442\u0456\u043B\u043E \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u0454 \u0432 \u0441\u043E\u0431\u0456 \u0441\u0442\u0456\u043B\u044C\u043A\u0438 \u0441\u0438\u043B\u0438 \u0442\u0430 \u0435\u043D\u0435\u0440\u0433\u0456\u0457. \u042F \u0442\u0430, \u0445\u0442\u043E \u043E\u0447\u0438\u0449\u0443\u0454 \u0442\u0456\u043B\u043E, \u043F\u043E\u0432\u0435\u0440\u0442\u0430\u044E\u0447\u0438 \u0439\u043E\u043C\u0443 \u043B\u0435\u0433\u043A\u0456\u0441\u0442\u044C, \u043B\u044E\u0431\u043E\u0432, \u043D\u0456\u0436\u043D\u0456\u0441\u0442\u044C \u0456 \u043D\u0435\u0439\u043C\u043E\u0432\u0456\u0440\u043D\u0435 \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E\u0441\u0442\u0456.",
      paragraph1: "\u0417\u0430\u043F\u0440\u043E\u0448\u0443\u044E \u0432\u0430\u0441 \u0441\u043F\u0440\u043E\u0431\u0443\u0432\u0430\u0442\u0438 \u043C\u043E\u0457 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443 \u2014 \u0446\u0435 \u0441\u043F\u0440\u0430\u0432\u0436\u043D\u0456\u0439 \u0441\u043F\u0430-\u0434\u043E\u0441\u0432\u0456\u0434, \u0430\u0434\u0436\u0435 \u043E\u043A\u0440\u0456\u043C \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F, \u0432\u0438 \u043E\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u0435 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0435 \u0432\u0456\u0434\u043B\u0443\u0449\u0435\u043D\u043D\u044F \u0448\u043A\u0456\u0440\u0438. \u0414\u043B\u044F \u043C\u0435\u043D\u0435 \u043A\u043E\u0436\u043D\u0430 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u2014 \u0446\u0435 \u043D\u0430\u0441\u0430\u043C\u043F\u0435\u0440\u0435\u0434 \u043F\u0440\u043E \u0441\u0430\u043C\u0443 \u0436\u0456\u043D\u043A\u0443: \u0457\u0457 \u0442\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044E, \u0457\u0457 \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F, \u0457\u0457 \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0456\u0441\u0442\u044C \u0442\u0430 \u043D\u0435\u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0443 \u043A\u0440\u0430\u0441\u0443 \u0457\u0457 \u0442\u0456\u043B\u0430, \u044F\u043A\u0443 \u044F \u043F\u0456\u0434\u043A\u0440\u0435\u0441\u043B\u044E\u044E \u0441\u0432\u043E\u0454\u044E \u043C\u0430\u0439\u0441\u0442\u0435\u0440\u043D\u0456\u0441\u0442\u044E.",
      paragraph2: "\u042F \u0449\u0438\u0440\u043E \u043B\u044E\u0431\u043B\u044E \u0442\u0435, \u0449\u043E \u0440\u043E\u0431\u043B\u044E, \u0456 \u0432\u0456\u0440\u044E, \u0449\u043E \u0441\u043F\u0440\u0430\u0432\u0436\u043D\u0454 \u043C\u0438\u0441\u0442\u0435\u0446\u0442\u0432\u043E \u043D\u0430\u0440\u043E\u0434\u0436\u0443\u0454\u0442\u044C\u0441\u044F \u043B\u0438\u0448\u0435 \u0437 \u043B\u044E\u0431\u043E\u0432\u0456. \u042F\u043A\u0449\u043E \u0446\u0435\u0439 \u043F\u0456\u0434\u0445\u0456\u0434 \u0432\u0430\u043C \u0432\u0456\u0434\u0433\u0443\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0431\u0443\u0434\u0443 \u0440\u0430\u0434\u0430 \u0432\u0456\u0442\u0430\u0442\u0438 \u0432\u0430\u0441 \u0443 \u0441\u0435\u0431\u0435 \u2764\uFE0F\u{1F525}",
      ctaBook: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F \u043D\u0430 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443",
      ctaAbout: "\u041F\u0440\u043E \u043C\u0435\u043D\u0435",
      scroll: "\u0413\u043E\u0440\u0442\u0430\u0439\u0442\u0435",
      pauseVideo: "\u041F\u0440\u0438\u0437\u0443\u043F\u0438\u043D\u0438\u0442\u0438 \u0432\u0456\u0434\u0435\u043E",
      playVideo: "\u0412\u0456\u0434\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0432\u0456\u0434\u0435\u043E"
    },
    about: {
      eyebrow: "\u041F\u0440\u043E \u043C\u0435\u043D\u0435",
      heading: "\u041C\u0430\u0440\u0456\u044F \u0412\u0430\u0446\u0435\u0431\u0430",
      subtitle: "\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u043A\u0430 \u0437 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443",
      paragraph1: "\u041F\u0440\u0438\u0432\u0456\u0442, \u044F \u041C\u0430\u0440\u0456\u044F \u{1F603} \u2014 \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u043A\u0430 \u0437 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443, \u0443\u043A\u0440\u0430\u0457\u043D\u043A\u0430, \u0456 \u043B\u044E\u0434\u0438\u043D\u0430, \u044F\u043A\u0430 \u043F\u043E-\u0441\u043F\u0440\u0430\u0432\u0436\u043D\u044C\u043E\u043C\u0443 \u043B\u044E\u0431\u0438\u0442\u044C \u0441\u0432\u043E\u044E \u0441\u043F\u0440\u0430\u0432\u0443. \u041C\u0435\u043D\u0456 31, \u0456 \u044F \u0441\u0430\u043C\u0430 \u0432\u0438\u0445\u043E\u0432\u0443\u044E \u0434\u0432\u043E\u0445 \u0447\u0443\u0434\u043E\u0432\u0438\u0445 \u0434\u043E\u043D\u0435\u0447\u043E\u043A, \u0404\u0432\u0443 \u0442\u0430 \u042F\u043D\u0443. \u0412\u043E\u043D\u0438 \u2014 \u043C\u043E\u0454 \u0432\u0441\u0435 \u0456 \u043C\u043E\u044F \u043D\u0430\u0439\u0431\u0456\u043B\u044C\u0448\u0430 \u043C\u043E\u0442\u0438\u0432\u0430\u0446\u0456\u044F \u0449\u043E\u0434\u043D\u044F. \u041D\u0430\u0448\u0430 \u0456\u0441\u0442\u043E\u0440\u0456\u044F \u0441\u043A\u043B\u0430\u0434\u0430\u043B\u0430\u0441\u044F \u043D\u0435\u043F\u0440\u043E\u0441\u0442\u043E \u2014 \u044F \u043F\u0440\u0438\u0457\u0445\u0430\u043B\u0430 \u0434\u043E \u0412\u0435\u043B\u0438\u043A\u043E\u0457 \u0411\u0440\u0438\u0442\u0430\u043D\u0456\u0457 \u0437 \u043C\u0456\u0441\u044F\u0447\u043D\u043E\u044E \u0434\u043E\u043D\u0435\u0447\u043A\u043E\u044E, \u044F\u043A\u0430 \u043D\u0430\u0440\u043E\u0434\u0438\u043B\u0430\u0441\u044C \u043F\u0456\u0434 \u0447\u0430\u0441 \u0432\u0456\u0439\u043D\u0438 \u0432 \u0423\u043A\u0440\u0430\u0457\u043D\u0456. \u0426\u0435\u0439 \u0448\u043B\u044F\u0445 \u043D\u0430\u0432\u0447\u0438\u0432 \u043C\u0435\u043D\u0435, \u043D\u0430\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u0446\u0456\u043D\u043D\u0456 \u0431\u0435\u0437\u043F\u0435\u043A\u0430, \u0441\u043F\u043E\u043A\u0456\u0439 \u0456 \u0442\u0443\u0440\u0431\u043E\u0442\u0430 \u043F\u0440\u043E \u0441\u0435\u0431\u0435.",
      paragraph2: "\u042F \u0432\u0456\u0434\u043A\u0440\u0438\u043B\u0430 \u0434\u043B\u044F \u0441\u0435\u0431\u0435 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433, \u043A\u043E\u043B\u0438 \u043C\u043E\u044F \u0441\u0442\u0430\u0440\u0448\u0430 \u0434\u043E\u043D\u044C\u043A\u0430 \u0431\u0443\u043B\u0430 \u0449\u0435 \u0437\u043E\u0432\u0441\u0456\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u044E, \u0456 \u043C\u0435\u043D\u0456 \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0431\u0443\u043B\u0430 \u0441\u043F\u0440\u0430\u0432\u0430, \u044F\u043A\u0430 \u0434\u043E\u0437\u0432\u043E\u043B\u044F\u043B\u0430 \u0431 \u0431\u0443\u0442\u0438 \u043F\u043E\u0440\u0443\u0447 \u0456\u0437 \u043D\u0435\u044E. \u0422\u0435, \u0449\u043E \u043F\u043E\u0447\u0430\u043B\u043E\u0441\u044F \u044F\u043A \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u043D\u0435 \u0440\u0456\u0448\u0435\u043D\u043D\u044F, \u043D\u0435\u043F\u043E\u043C\u0456\u0442\u043D\u043E \u043F\u0435\u0440\u0435\u0442\u0432\u043E\u0440\u0438\u043B\u043E\u0441\u044F \u043D\u0430 \u043D\u0430\u0439\u0431\u0456\u043B\u044C\u0448\u0443 \u043B\u044E\u0431\u043E\u0432 \u043C\u043E\u0433\u043E \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u043E\u0433\u043E \u0436\u0438\u0442\u0442\u044F. \u0412\u0456\u0441\u0456\u043C \u0440\u043E\u043A\u0456\u0432 \u043F\u043E \u0442\u043E\u043C\u0443 \u0446\u0435 \u0434\u043B\u044F \u043C\u0435\u043D\u0435 \u043D\u0430\u0431\u0430\u0433\u0430\u0442\u043E \u0431\u0456\u043B\u044C\u0448\u0435, \u043D\u0456\u0436 \u043F\u0440\u043E\u0441\u0442\u043E \u0440\u043E\u0431\u043E\u0442\u0430. \u041C\u0430\u044E\u0447\u0438 \u043E\u0441\u0432\u0456\u0442\u0443 \u0443 \u0444\u0456\u043D\u0430\u043D\u0441\u0430\u0445, \u0435\u043A\u043E\u043D\u043E\u043C\u0456\u0446\u0456 \u0442\u0430 \u0434\u043E\u0441\u0432\u0456\u0434 \u043D\u0430\u0443\u043A\u043E\u0432\u0438\u0445 \u0434\u043E\u0441\u043B\u0456\u0434\u0436\u0435\u043D\u044C, \u044F \u0437\u0430\u0432\u0436\u0434\u0438 \u0434\u0431\u0430\u0439\u043B\u0438\u0432\u043E \u0441\u0442\u0430\u0432\u0438\u043B\u0430\u0441\u044F \u0434\u043E \u0442\u043E\u0433\u043E, \u0449\u043E\u0431 \u0440\u043E\u0431\u0438\u0442\u0438 \u0432\u0441\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0439 \u043F\u043E\u044F\u0441\u043D\u044E\u0432\u0430\u0442\u0438 \u0437\u0440\u043E\u0437\u0443\u043C\u0456\u043B\u043E \u2014 \u0456 \u0446\u0435 \u0432\u0456\u0434\u0447\u0443\u0432\u0430\u0454\u0442\u044C\u0441\u044F \u0432 \u0443\u0441\u044C\u043E\u043C\u0443, \u0449\u043E \u044F \u0441\u0442\u0432\u043E\u0440\u044E\u044E: \u0432\u0456\u0434 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440 \u0434\u043E \u043A\u0443\u0440\u0441\u0456\u0432.",
      paragraph3: "\u042F \u0449\u0438\u0440\u043E \u0432\u0456\u0440\u044E, \u0449\u043E \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u2014 \u0446\u0435 \u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u0438\u0439 \u0430\u043A\u0442 \u0442\u0443\u0440\u0431\u043E\u0442\u0438 \u043F\u0440\u043E \u0441\u0435\u0431\u0435, \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0439 \u0440\u0438\u0442\u0443\u0430\u043B \u043B\u0438\u0448\u0435 \u0434\u043B\u044F \u0432\u0430\u0441. \u041A\u043E\u043B\u0438 \u0432\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442\u0435 \u0434\u043E \u043C\u0435\u043D\u0435, \u044F \u0445\u043E\u0447\u0443, \u0449\u043E\u0431 \u0432\u0438 \u0432\u0456\u0434\u0447\u0443\u0432\u0430\u043B\u0438 \u0441\u0435\u0431\u0435 \u0431\u0430\u0436\u0430\u043D\u043E\u044E \u0433\u043E\u0441\u0442\u0435\u044E, \u0440\u043E\u0437\u0441\u043B\u0430\u0431\u043B\u0435\u043D\u043E\u044E \u0442\u0430 \u0434\u043E\u0433\u043B\u044F\u043D\u0443\u0442\u043E\u044E \u0437 \u043F\u0435\u0440\u0448\u043E\u0457 \u0436 \u0445\u0432\u0438\u043B\u0438\u043D\u0438. \u041C\u0435\u043D\u0456 \u0434\u0443\u0436\u0435 \u043F\u0440\u0438\u0454\u043C\u043D\u043E \u0431\u0443\u0442\u0438 \u0431\u043E\u0434\u0430\u0439 \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u044E \u0447\u0430\u0441\u0442\u0438\u043D\u043A\u043E\u044E \u0432\u0430\u0448\u043E\u0457 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E\u0441\u0442\u0456 \u0442\u0430 \u0441\u044F\u0439\u0432\u0430. \u042F \u0449\u0438\u0440\u043E \u0440\u0430\u0434\u0430, \u0449\u043E \u0432\u0438 \u0442\u0443\u0442.",
      stat1Label: "\u0420\u043E\u043A\u0456\u0432 \u0434\u043E\u0441\u0432\u0456\u0434\u0443",
      stat2Label: "\u041F\u0435\u0440\u0435\u043C\u043E\u0436\u043D\u0438\u0446\u044F \u043C\u0456\u0436\u043D\u0430\u0440\u043E\u0434\u043D\u0438\u0445 \u0447\u0435\u043C\u043F\u0456\u043E\u043D\u0430\u0442\u0456\u0432",
      stat3Label: "\u0417\u0430\u0434\u043E\u0432\u043E\u043B\u0435\u043D\u0438\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u043E\u043A",
      stat4Label: "\u0413\u0430\u0440\u0430\u043D\u0442\u0456\u044F \u0433\u043B\u0430\u0434\u043A\u043E\u0457 \u0448\u043A\u0456\u0440\u0438",
      quoteHeading: "\xAB\u0412\u0456\u0434\u0447\u0443\u0432\u0430\u044E \u0446\u0435 \u0441\u0430\u043C\u0430 \u0456 \u043D\u0430\u0432\u0447\u0443 \u0442\u0432\u043E\u0454 \u0442\u0456\u043B\u043E \u043F\u043E\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u0442\u0430\u043A \u0441\u0430\u043C\u043E \u0440\u043E\u0437\u043A\u0456\u0448\u043D\u043E\xBB",
      secondParagraph1: "\u042F \u043E\u0431\u0438\u0440\u0430\u044E \u0446\u0435\u0439 \u043C\u0435\u0442\u043E\u0434 \u0434\u043B\u044F \u0441\u0435\u0431\u0435 \u0449\u043E\u043C\u0456\u0441\u044F\u0446\u044F \u0432\u0436\u0435 \u043F\u043E\u043D\u0430\u0434 8 \u0440\u043E\u043A\u0456\u0432. \u0414\u043B\u044F \u043C\u0435\u043D\u0435 \u0446\u0435 \u043F\u0440\u043E \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F, \u0441\u0432\u0456\u0436\u043E\u0441\u0442\u0456, \u0447\u0438\u0441\u0442\u043E\u0442\u0438, \u0440\u043E\u0437\u043A\u043E\u0448\u0456 \u0442\u0430 \u0431\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u043E\u0433\u043E \u0434\u043E\u0433\u043B\u044F\u0434\u0443. \u0426\u0435 \u0442\u043E\u0439 \u0441\u0430\u043C\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442, \u043A\u043E\u043B\u0438 \u0432\u0441\u0435 \u0442\u0456\u043B\u043E \u043D\u0456\u0431\u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0443\u0454\u0442\u044C\u0441\u044F, \u0437'\u044F\u0432\u043B\u044F\u0454\u0442\u044C\u0441\u044F \u043D\u043E\u0432\u0438\u0439 \u0432\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u0456\u0439 \u0441\u0442\u0430\u043D, \u0456 \u044F \u0432\u0456\u0434\u0447\u0443\u0432\u0430\u044E \u0433\u043E\u0442\u043E\u0432\u043D\u0456\u0441\u0442\u044C \u043F\u043E-\u0456\u043D\u0448\u043E\u043C\u0443 \u0434\u0438\u0432\u0438\u0442\u0438\u0441\u044F \u043D\u0430 \u0441\u0432\u0456\u0442.",
      secondParagraph2: "\u041A\u0440\u0456\u043C \u0442\u043E\u0433\u043E, \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u2014 \u0446\u0435 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430, \u044F\u043A\u0430 \u0437\u043C\u0456\u043D\u044E\u0454 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0442\u0430 \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0432\u0430\u0448\u043E\u0433\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F. \u041F\u0456\u0441\u043B\u044F \u043F\u0435\u0440\u0448\u043E\u0433\u043E \u0436 \u0440\u0430\u0437\u0443 \u0432\u0438 \u0432\u0442\u0440\u0430\u0447\u0430\u0454\u0442\u0435 30\u201340% \u0433\u0443\u0441\u0442\u043E\u0442\u0438, \u0430 \u0432\u043E\u043B\u043E\u0441\u0441\u044F, \u0449\u043E \u0432\u0456\u0434\u0440\u043E\u0441\u0442\u0430\u0454, \u0441\u0442\u0430\u0454 \u0442\u043E\u043D\u0448\u0438\u043C, \u0441\u0432\u0456\u0442\u043B\u0456\u0448\u0438\u043C \u0456 \u043C'\u044F\u043A\u0448\u0438\u043C. \u0417 \u0447\u0430\u0441\u043E\u043C \u043D\u0430 \u0434\u0435\u044F\u043A\u0438\u0445 \u0434\u0456\u043B\u044F\u043D\u043A\u0430\u0445 \u0432\u043E\u043D\u043E \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0454 \u0440\u043E\u0441\u0442\u0438 \u0437\u043E\u0432\u0441\u0456\u043C, \u0434\u0430\u0440\u0443\u044E\u0447\u0438 \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u0438\u0439 \xAB\u0435\u0444\u0435\u043A\u0442 \u043B\u0430\u0437\u0435\u0440\u0430\xBB \u0431\u0435\u0437 \u0436\u043E\u0434\u043D\u043E\u0433\u043E \u0432\u0442\u0440\u0443\u0447\u0430\u043D\u043D\u044F \u0430\u043F\u0430\u0440\u0430\u0442\u0456\u0432.",
      secondParagraph3: "\u0426\u0435 \u0442\u0435, \u0449\u043E \u044F \u0446\u0456\u043D\u0443\u044E \u043D\u0430\u0439\u0431\u0456\u043B\u044C\u0448\u0435. \u041D\u0430\u0448\u0435 \u0442\u0456\u043B\u043E \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454 \u043D\u0430\u0441 \u0449\u043E\u0434\u043D\u044F, \u0456 \u044F \u0442\u0430\u043A\u0430 \u0449\u0430\u0441\u043B\u0438\u0432\u0430 \u0434\u0430\u0440\u0443\u0432\u0430\u0442\u0438 \u0441\u0432\u043E\u0454\u043C\u0443 \u0434\u0431\u0430\u0439\u043B\u0438\u0432\u0438\u0439 \u0434\u043E\u0433\u043B\u044F\u0434, \u043D\u0430 \u044F\u043A\u0438\u0439 \u0432\u043E\u043D\u043E \u0437\u0430\u0441\u043B\u0443\u0433\u043E\u0432\u0443\u0454. \u0421\u0430\u043C\u0435 \u0446\u0435 \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F \u043B\u044E\u0431\u043E\u0432\u0456 \u0434\u043E \u0441\u0435\u0431\u0435, \u043B\u0435\u0433\u043A\u043E\u0441\u0442\u0456 \u0442\u0430 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E\u0441\u0442\u0456 \u044F \u0439 \u043F\u0435\u0440\u0435\u0434\u0430\u044E \u0441\u0432\u043E\u0457\u043C \u043A\u043B\u0456\u0454\u043D\u0442\u043A\u0430\u043C \u0449\u043E\u0434\u043D\u044F."
    },
    why: {
      eyebrow: "\u041C\u0435\u0442\u043E\u0434",
      heading: "\u0427\u043E\u043C\u0443 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433?",
      subtext: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u2014 \u0446\u0435 100% \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u0438\u0439 \u0442\u0430 \u043E\u0440\u0433\u0430\u043D\u0456\u0447\u043D\u0438\u0439 \u043C\u0435\u0442\u043E\u0434 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0446\u0443\u043A\u0440\u043E\u0432\u043E\u044E \u043F\u0430\u0441\u0442\u043E\u044E. \u0414\u043B\u044F \u043C\u0435\u043D\u0435 \u0446\u0435 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F, \u0430 \u0440\u043E\u0437\u043A\u0456\u0448\u043D\u0438\u0439 \u0441\u043F\u0430-\u0440\u0438\u0442\u0443\u0430\u043B \u0442\u0443\u0440\u0431\u043E\u0442\u0438 \u043F\u0440\u043E \u0441\u0435\u0431\u0435.",
      benefit1Title: "\u041E\u0440\u0433\u0430\u043D\u0456\u0447\u043D\u0438\u0439 \u0441\u043F\u0430-\u0434\u043E\u0433\u043B\u044F\u0434",
      benefit1Desc: "\u041F\u0430\u0441\u0442\u0430 \u043C\u0456\u0441\u0442\u0438\u0442\u044C 0% \u0445\u0456\u043C\u0456\u0457 \u0442\u0430 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0432\u0438\u043A\u043B\u044E\u0447\u0430\u0454 \u043F\u043E\u044F\u0432\u0443 \u043E\u043F\u0456\u043A\u0456\u0432 \u0447\u0438 \u043F\u043E\u0448\u043A\u043E\u0434\u0436\u0435\u043D\u044C. \u041F\u0456\u0434 \u0447\u0430\u0441 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0432\u0456\u0434\u0431\u0443\u0432\u0430\u0454\u0442\u044C\u0441\u044F \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0438\u0439 \u043F\u0456\u043B\u0456\u043D\u0433 \u0448\u043A\u0456\u0440\u0438 \u2014 \u043F\u0430\u0441\u0442\u0430 \u0434\u0431\u0430\u0439\u043B\u0438\u0432\u043E \u0432\u0438\u0434\u0430\u043B\u044F\u0454 \u043E\u0440\u043E\u0433\u043E\u0432\u0456\u043B\u0456 \u043A\u043B\u0456\u0442\u0438\u043D\u0438, \u0437\u0430\u0432\u0434\u044F\u043A\u0438 \u0447\u043E\u043C\u0443 \u0432\u0430\u0448\u0430 \u0448\u043A\u0456\u0440\u0430 \u0441\u0442\u0430\u0454 \u043D\u0435\u0439\u043C\u043E\u0432\u0456\u0440\u043D\u043E \u043D\u0456\u0436\u043D\u043E\u044E, \u0433\u043B\u0430\u0434\u043A\u043E\u044E \u0442\u0430 \u0431\u0430\u0440\u0445\u0430\u0442\u043D\u043E\u044E \u043D\u0430 \u0434\u043E\u0442\u0438\u043A.",
      benefit2Title: "\u041F\u0440\u0438\u0440\u043E\u0434\u043D\u0438\u0439 \xAB\u0435\u0444\u0435\u043A\u0442 \u043B\u0430\u0437\u0435\u0440\u0430\xBB",
      benefit2Desc: "\u0423\u0436\u0435 \u043F\u0456\u0441\u043B\u044F \u043F\u0435\u0440\u0448\u043E\u0433\u043E \u0432\u0456\u0437\u0438\u0442\u0443 \u0432\u0442\u0440\u0430\u0447\u0430\u0454\u0442\u044C\u0441\u044F 30\u201340% \u0433\u0443\u0441\u0442\u043E\u0442\u0438 \u0432\u043E\u043B\u043E\u0441\u0441\u044F. \u0412\u043E\u043D\u043E \u0441\u0442\u0430\u0454 \u0442\u043E\u043D\u0448\u0438\u043C \u0456 \u0441\u0432\u0456\u0442\u043B\u0456\u0448\u0438\u043C, \u0430 \u0437 \u0447\u0430\u0441\u043E\u043C \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0437\u043D\u0438\u043A\u0430\u0454 \u043D\u0430 \u043F\u0435\u0432\u043D\u0438\u0445 \u0434\u0456\u043B\u044F\u043D\u043A\u0430\u0445. \u0426\u0435\u0439 \u0442\u0435\u0440\u043C\u0456\u043D \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0438\u0439 \u2014 \u0443 \u043A\u043E\u0433\u043E\u0441\u044C \u0446\u0435 \u0437\u0430\u0439\u043C\u0430\u0454 \u0440\u0456\u043A, \u0430 \u0432 \u043A\u043E\u0433\u043E\u0441\u044C \u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430 \u0440\u043E\u043A\u0456\u0432.",
      benefit3Title: "\u0410\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u0430 \u0431\u0435\u0437\u043F\u0435\u043A\u0430",
      benefit3Desc: "\u041F\u0430\u0441\u0442\u0430 \u043D\u0430\u043D\u043E\u0441\u0438\u0442\u044C\u0441\u044F \u0437\u0430 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E\u0457 \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0438 \u0442\u0456\u043B\u0430, \u0442\u043E\u043C\u0443 \u0447\u0443\u0434\u043E\u0432\u043E \u043F\u0456\u0434\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0430\u0432\u0456\u0442\u044C \u0434\u043B\u044F \u0447\u0443\u0442\u043B\u0438\u0432\u043E\u0457 \u0448\u043A\u0456\u0440\u0438, \u043F\u0456\u0434 \u0447\u0430\u0441 \u0432\u0430\u0433\u0456\u0442\u043D\u043E\u0441\u0442\u0456, \u043F\u0440\u0438 \u0432\u0430\u0440\u0438\u043A\u043E\u0437\u0456 \u0447\u0438 \u0440\u043E\u0437\u0442\u044F\u0436\u043A\u0430\u0445.",
      benefit4Title: "\u0412\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u0454 \u043F\u0435\u0440\u0435\u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F",
      benefit4Desc: "\u0426\u0435 \u0442\u043E\u0439 \u0441\u0430\u043C\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u043C\u0456\u0441\u044F\u0446\u044F, \u043A\u043E\u043B\u0438 \u0432\u0441\u0435 \u0442\u0456\u043B\u043E \u043F\u0435\u0440\u0435\u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0443\u0454\u0442\u044C\u0441\u044F, \u0434\u0430\u0440\u0443\u044E\u0447\u0438 \u0447\u0443\u0434\u043E\u0432\u0435 \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F \u043B\u0435\u0433\u043A\u043E\u0441\u0442\u0456, \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E\u0441\u0442\u0456 \u0442\u0430 \u043B\u044E\u0431\u043E\u0432\u0456 \u0434\u043E \u0441\u0435\u0431\u0435.",
      closingQuote: "\xAB\u0412\u0456\u0434\u0447\u0443\u0432\u0430\u044E \u0446\u0435 \u0441\u0430\u043C\u0430 \u0456 \u043D\u0430\u0432\u0447\u0443 \u0442\u0432\u043E\u0454 \u0442\u0456\u043B\u043E \u043F\u043E\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u0442\u0430\u043A \u0441\u0430\u043C\u043E \u0440\u043E\u0437\u043A\u0456\u0448\u043D\u043E\xBB"
    },
    apart: {
      eyebrow: "\u0429\u043E \u043C\u0435\u043D\u0435 \u0432\u0438\u0440\u0456\u0437\u043D\u044F\u0454",
      heading: "\u0406\u043D\u0448\u0438\u0439 \u0440\u0456\u0432\u0435\u043D\u044C \u0442\u0443\u0440\u0431\u043E\u0442\u0438",
      paragraph1: "\u042F \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0437\u0443\u044E\u0441\u044F \u043D\u0430 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443 \u2014 \u043D\u0430\u0434\u0437\u0432\u0438\u0447\u0430\u0439\u043D\u043E \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u043E\u043C\u0443, \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u043E\u043C\u0443 \u043C\u0435\u0442\u043E\u0434\u0456, \u044F\u043A\u0438\u0439 \u0434\u0443\u0436\u0435 \u0434\u0431\u0430\u0439\u043B\u0438\u0432\u0438\u0439 \u043D\u0430\u0432\u0456\u0442\u044C \u0434\u043E \u043D\u0430\u0439\u0447\u0443\u0442\u043B\u0438\u0432\u0456\u0448\u043E\u0457 \u0448\u043A\u0456\u0440\u0438.",
      paragraph2: "\u0406\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u043A\u043B\u0456\u0454\u043D\u0442\u043E\u043A, \u044F\u043A\u0456 \u0446\u0456\u043D\u0443\u044E\u0442\u044C \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0456\u0441\u0442\u044C, \u043A\u043E\u043C\u0444\u043E\u0440\u0442, \u0432\u0438\u0441\u043E\u043A\u0443 \u044F\u043A\u0456\u0441\u0442\u044C \u0456 \u0437\u0430\u0442\u0438\u0448\u043D\u0443 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0443 \u2014 \u0456 \u043E\u0431\u0438\u0440\u0430\u044E\u0442\u044C \u0434\u043B\u044F \u0441\u0432\u043E\u0454\u0457 \u0448\u043A\u0456\u0440\u0438 \u043B\u0438\u0448\u0435 \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0435.",
      feature1Title: "\u041D\u0443\u043B\u044C\u043E\u0432\u0438\u0439 \u0440\u0438\u0437\u0438\u043A \u043E\u043F\u0456\u043A\u0456\u0432",
      feature1Desc: "\u041F\u0430\u0441\u0442\u0430 \u043D\u0430\u043D\u043E\u0441\u0438\u0442\u044C\u0441\u044F \u0437\u0430 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E\u0457 \u043A\u0456\u043C\u043D\u0430\u0442\u043D\u043E\u0457 \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0438.",
      feature2Title: "\u0414\u0431\u0430\u0439\u043B\u0438\u0432\u0438\u0439, \u0443\u0432\u0430\u0436\u043D\u0438\u0439 \u043F\u0456\u0434\u0445\u0456\u0434",
      feature2Desc: "\u041C\u043E\u044F \u0442\u0435\u0445\u043D\u0456\u043A\u0430 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0430\u0434\u0430\u043F\u0442\u0443\u0454\u0442\u044C\u0441\u044F \u043F\u0456\u0434 \u0432\u0430\u0441.",
      feature3Title: "\u0411\u0456\u043B\u044C\u0448\u0435, \u043D\u0456\u0436 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F",
      feature3Desc: "\u0426\u0435 \u0440\u043E\u0437\u043A\u0456\u0448\u043D\u0435 \u0421\u041F\u0410-\u0432\u0456\u0434\u043B\u0443\u0449\u0435\u043D\u043D\u044F, \u043F\u0456\u0441\u043B\u044F \u044F\u043A\u043E\u0433\u043E \u0448\u043A\u0456\u0440\u0430 \u0441\u0442\u0430\u0454 \u0448\u043E\u0432\u043A\u043E\u0432\u0438\u0441\u0442\u043E-\u0433\u043B\u0430\u0434\u043A\u043E\u044E \u0442\u0430 \u0441\u044F\u044E\u0447\u043E\u044E."
    },
    space: {
      eyebrow: "\u0421\u0442\u0443\u0434\u0456\u044F",
      heading: "\u0422\u0435\u043F\u043B\u0438\u0439 \u043F\u0440\u0438\u0439\u043E\u043C \u0443 \u043C\u043E\u0454\u043C\u0443 \u043F\u0440\u043E\u0441\u0442\u043E\u0440\u0456 \u043A\u0440\u0430\u0441\u0438",
      paragraph1: "\u042F \u0432\u0432\u0430\u0436\u0430\u044E, \u0449\u043E \u0432\u0456\u0437\u0438\u0442 \u043D\u0430 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043F\u0440\u0438\u0454\u043C\u043D\u043E\u044E \u043F\u0435\u0440\u0435\u0440\u0432\u043E\u044E \u0434\u043B\u044F \u0432\u0456\u0434\u043F\u043E\u0447\u0438\u043D\u043A\u0443, \u0430 \u043D\u0435 \u0440\u0443\u0442\u0438\u043D\u043D\u0438\u043C \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u043C. \u0422\u043E\u043C\u0443 \u044F \u0441\u0442\u0432\u043E\u0440\u0438\u043B\u0430 \u0437\u0430\u0442\u0438\u0448\u043D\u0438\u0439 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0438\u0439 \u043F\u0440\u043E\u0441\u0442\u0456\u0440, \u0434\u0435 \u043F\u043E\u0454\u0434\u043D\u0443\u044E\u0442\u044C\u0441\u044F \u043A\u043E\u043C\u0444\u043E\u0440\u0442, \u0431\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u0430 \u0433\u0456\u0433\u0456\u0454\u043D\u0430 \u0442\u0430 \u0440\u043E\u0437\u043A\u0456\u0448.",
      paragraph2: "\u041A\u043E\u0436\u043D\u0430 \u0434\u0435\u0442\u0430\u043B\u044C \u043C\u043E\u0433\u043E \u043A\u0430\u0431\u0456\u043D\u0435\u0442\u0443 \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u0440\u043E\u0434\u0443\u043C\u0430\u043D\u0430. \u0412\u0456\u0434 \u0442\u0435\u043F\u043B\u043E\u0433\u043E \u043F\u0440\u0438\u0433\u043B\u0443\u0448\u0435\u043D\u043E\u0433\u043E \u043E\u0441\u0432\u0456\u0442\u043B\u0435\u043D\u043D\u044F \u0442\u0430 \u043C'\u044F\u043A\u043E\u0457 \u043F\u043E\u0441\u0442\u0456\u043B\u044C\u043D\u043E\u0457 \u0431\u0456\u043B\u0438\u0437\u043D\u0438 \u0434\u043E \u043C\u0435\u0434\u0438\u0447\u043D\u043E\u0433\u043E \u0440\u0456\u0432\u043D\u044F \u0434\u0435\u0437\u0456\u043D\u0444\u0435\u043A\u0446\u0456\u0457 \u2014 \u0432\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0440\u043E\u0437\u0441\u043B\u0430\u0431\u0438\u0442\u0438\u0441\u044F, \u0437\u043D\u0430\u044E\u0447\u0438, \u0449\u043E \u043F\u0435\u0440\u0435\u0431\u0443\u0432\u0430\u0454\u0442\u0435 \u0432 \u043D\u0430\u0434\u0456\u0439\u043D\u0438\u0445, \u0434\u0431\u0430\u0439\u043B\u0438\u0432\u0438\u0445 \u0440\u0443\u043A\u0430\u0445.",
      highlight1Title: "\u041B\u0456\u043A\u0430\u0440\u043D\u044F\u043D\u0438\u0439 \u0440\u0456\u0432\u0435\u043D\u044C \u0433\u0456\u0433\u0456\u0454\u043D\u0438",
      highlight1Desc: "100% \u043E\u0434\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438, \u0434\u0435\u0437\u0456\u043D\u0444\u0435\u043A\u0446\u0456\u044F \u043F\u043E\u0432\u0435\u0440\u0445\u043E\u043D\u044C \u043C\u0435\u0434\u0438\u0447\u043D\u043E\u0433\u043E \u0440\u0456\u0432\u043D\u044F \u0442\u0430 \u0431\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u043E \u0441\u0442\u0435\u0440\u0438\u043B\u044C\u043D\u0456 \u0456\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0438.",
      highlight2Title: "\u0417\u0430\u0442\u0438\u0448\u043D\u0430 \u0442\u0430 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0430 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430",
      highlight2Desc: "\u0422\u0438\u0445\u0430, \u0442\u0435\u043F\u043B\u0430 \u043A\u0456\u043C\u043D\u0430\u0442\u0430 \u0456\u0437 \u0437\u0430\u0441\u043F\u043E\u043A\u0456\u0439\u043B\u0438\u0432\u043E\u044E \u043C\u0443\u0437\u0438\u043A\u043E\u044E, \u043C'\u044F\u043A\u043E\u044E \u0431\u0456\u043B\u0438\u0437\u043D\u043E\u044E \u0442\u0430 \u043C'\u044F\u043A\u0438\u043C \u043E\u0441\u0432\u0456\u0442\u043B\u0435\u043D\u043D\u044F\u043C \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u043F\u043E\u0432\u043D\u043E\u0433\u043E \u0440\u043E\u0437\u0441\u043B\u0430\u0431\u043B\u0435\u043D\u043D\u044F.",
      highlight3Title: "\u041F\u0440\u0435\u043C\u0456\u0430\u043B\u044C\u043D\u0430 \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u0430 \u043A\u043E\u0441\u043C\u0435\u0442\u0438\u043A\u0430",
      highlight3Desc: "\u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E \u043B\u0438\u0448\u0435 \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0456 \u043E\u0440\u0433\u0430\u043D\u0456\u0447\u043D\u0456 \u0446\u0443\u043A\u0440\u043E\u0432\u0456 \u043F\u0430\u0441\u0442\u0438 \u0442\u0430 \u0434\u043E\u0433\u043B\u044F\u0434\u043E\u0432\u0443 \u043A\u043E\u0441\u043C\u0435\u0442\u0438\u043A\u0443 \u043D\u0430 \u0440\u043E\u0441\u043B\u0438\u043D\u043D\u0456\u0439 \u043E\u0441\u043D\u043E\u0432\u0456, \u0449\u043E\u0431 \u043F\u043E\u0434\u0431\u0430\u0442\u0438 \u043F\u0440\u043E \u0432\u0430\u0448\u0443 \u0448\u043A\u0456\u0440\u0443.",
      imageHover1: "\u0417\u0430\u0442\u0438\u0448\u043D\u0438\u0439 \u043A\u0430\u0431\u0456\u043D\u0435\u0442",
      imageHover2: "\u042F\u043A\u0456\u0441\u043D\u0456 \u0437\u0430\u0441\u043E\u0431\u0438",
      imageHover3: "\u0427\u0438\u0441\u0442\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438",
      imageAlt1: "\u0427\u0438\u0441\u0442\u0438\u0439 \u0456 \u0437\u0430\u0442\u0438\u0448\u043D\u0438\u0439 \u043A\u0430\u0431\u0456\u043D\u0435\u0442 \u0434\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440",
      imageAlt2: "\u042F\u043A\u0456\u0441\u043D\u0456 \u0437\u0430\u0441\u043E\u0431\u0438",
      imageAlt3: "\u0427\u0438\u0441\u0442\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438"
    },
    beforeAfter: {
      eyebrow: "\u0420\u0435\u0430\u043B\u044C\u043D\u0456 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438",
      heading: "\u0414\u043E \u0442\u0430 \u043F\u0456\u0441\u043B\u044F",
      subtext: "\u0413\u043E\u0440\u0442\u0430\u0439\u0442\u0435 \u0430\u0431\u043E \u0441\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439\u0442\u0435\u0441\u044F \u0441\u0442\u0440\u0456\u043B\u043A\u0430\u043C\u0438, \u0449\u043E\u0431 \u043F\u043E\u0431\u0430\u0447\u0438\u0442\u0438 \u0432\u0440\u0430\u0436\u0430\u044E\u0447\u0456 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u043E\u0433\u043E \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443. \u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043D\u0430 \u0431\u0443\u0434\u044C-\u044F\u043A\u0435 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F, \u0449\u043E\u0431 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0434\u0435\u0442\u0430\u043B\u0456.",
      scrollLeft: "\u041F\u0440\u043E\u043A\u0440\u0443\u0442\u0438\u0442\u0438 \u0432\u043B\u0456\u0432\u043E",
      scrollRight: "\u041F\u0440\u043E\u043A\u0440\u0443\u0442\u0438\u0442\u0438 \u0432\u043F\u0440\u0430\u0432\u043E",
      placeholderLabel: "\u0424\u043E\u0442\u043E \u0434\u043E \u0442\u0430 \u043F\u0456\u0441\u043B\u044F",
      closeDetails: "\u0417\u0430\u043A\u0440\u0438\u0442\u0438 \u0434\u0435\u0442\u0430\u043B\u0456"
    },
    services: {
      eyebrow: "\u041F\u043E\u0441\u043B\u0443\u0433\u0438 \u0442\u0430 \u0446\u0456\u043D\u0438",
      heading: "\u041F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442",
      inclusionsLabel: "\u0429\u043E \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0443 \u043A\u043E\u0436\u0435\u043D \u0432\u0430\u0448 \u0432\u0456\u0437\u0438\u0442",
      inclusion1Title: "\u041F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u044F \u0448\u043A\u0456\u0440\u0438",
      inclusion1Desc: "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0438\u0439 \u0430\u043D\u0430\u043B\u0456\u0437 \u043F\u043E\u0442\u043E\u0447\u043D\u043E\u0433\u043E \u0441\u0442\u0430\u043D\u0443 \u0432\u0430\u0448\u043E\u0457 \u0448\u043A\u0456\u0440\u0438 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0447\u0430\u0442\u043A\u043E\u043C \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438.",
      inclusion2Title: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0456 \u0435\u043A\u0441\u043F\u0435\u0440\u0442\u043D\u0456 \u043F\u043E\u0440\u0430\u0434\u0438",
      inclusion2Desc: "\u0406\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0456 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457 \u0437 \u0434\u043E\u043C\u0430\u0448\u043D\u044C\u043E\u0433\u043E \u0434\u043E\u0433\u043B\u044F\u0434\u0443, \u0449\u043E\u0431 \u0432\u0430\u0448\u0430 \u0448\u043A\u0456\u0440\u0430 \u0437\u0430\u0432\u0436\u0434\u0438 \u0441\u044F\u044F\u043B\u0430 \u043C\u0456\u0436 \u0432\u0456\u0437\u0438\u0442\u0430\u043C\u0438.",
      inclusion3Title: "\u041B\u044E\u043A\u0441\u043E\u0432\u0438\u0439 \u0434\u043E\u0433\u043B\u044F\u0434",
      inclusion3Desc: "\u041F\u0440\u0435\u043C\u0456\u0430\u043B\u044C\u043D\u0430 \u043A\u043E\u0441\u043C\u0435\u0446\u0435\u0432\u0442\u0438\u043A\u0430 \u0442\u0430 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0456 \u0442\u0435\u0445\u043D\u0456\u043A\u0438 \u0441\u043F\u0430-\u043F\u0456\u043B\u0456\u043D\u0433\u0443 \u043F\u0456\u0434 \u0447\u0430\u0441 \u0432\u0430\u0448\u043E\u0433\u043E \u0441\u0435\u0430\u043D\u0441\u0443.",
      tabBikini: "\u0411\u0456\u043A\u0456\u043D\u0456",
      tabUpper: "\u0412\u0435\u0440\u0445\u043D\u044F \u0447\u0430\u0441\u0442\u0438\u043D\u0430 \u0442\u0456\u043B\u0430",
      tabDown: "\u041D\u0438\u0436\u043D\u044F \u0447\u0430\u0441\u0442\u0438\u043D\u0430 \u0442\u0456\u043B\u0430",
      tabFace: "\u041E\u0431\u043B\u0438\u0447\u0447\u044F",
      // Bikini
      bikiniFullLabel: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0431\u0456\u043A\u0456\u043D\u0456 \u0442\u0430 \u0456\u043D\u0442\u0438\u043C\u043D\u043E\u0457 \u0437\u043E\u043D\u0438",
      bikiniTagline: "\u041D\u0430\u0439\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u0456\u0448\u0456 \u043C\u043E\u0457 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u2014 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u0456 \u0434\u043B\u044F \u043F\u043E\u0432\u043D\u043E\u0457 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E\u0441\u0442\u0456 \u0442\u0430 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u0443.",
      bikiniService1Name: "Hollywood (\u0413\u043E\u043B\u043B\u0456\u0432\u0443\u0434)",
      bikiniService1Badge: "\u041D\u0430\u0439\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u0456\u0448\u0435",
      bikiniService1Duration: "40 \u0445\u0432 \u2013 1 \u0433\u043E\u0434\u0438\u043D\u0430",
      bikiniService1Desc: "\u041F\u043E\u0432\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432 \u0456\u043D\u0442\u0438\u043C\u043D\u0456\u0439 \u0437\u043E\u043D\u0456. \u0416\u043E\u0434\u043D\u043E\u0457 \u0432\u043E\u043B\u043E\u0441\u0438\u043D\u043A\u0438 \u043D\u0435 \u0437\u0430\u043B\u0438\u0448\u0430\u0454\u0442\u044C\u0441\u044F \u043D\u0430 \u043B\u043E\u0431\u043A\u0443, \u043B\u0456\u043D\u0456\u0457 \u0431\u0456\u043A\u0456\u043D\u0456, \u0441\u0442\u0430\u0442\u0435\u0432\u0438\u0445 \u0433\u0443\u0431\u0430\u0445 \u0442\u0430 \u0443 \u043C\u0456\u0436\u0441\u0456\u0434\u043D\u0438\u0447\u043D\u0456\u0439 \u0441\u043A\u043B\u0430\u0434\u0446\u0456! \u0417\u0430 \u0432\u0430\u0448\u0438\u043C \u0431\u0430\u0436\u0430\u043D\u043D\u044F\u043C, \u043D\u0430 \u043B\u043E\u0431\u043A\u0443 \u0441\u043F\u0435\u0440\u0435\u0434\u0443 \u043C\u043E\u0436\u043D\u0430 \u0437\u0430\u043B\u0438\u0448\u0438\u0442\u0438 \u0430\u043A\u0443\u0440\u0430\u0442\u043D\u0443 \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0443 \u0441\u043C\u0443\u0436\u043A\u0443 \u0430\u0431\u043E \u0442\u0440\u0438\u043A\u0443\u0442\u043D\u0438\u043A. \u0406\u0434\u0435\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u043F\u043E\u0432\u043D\u043E\u0457 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E\u0441\u0442\u0456.",
      bikiniService2Name: "Brazilian (\u0411\u0440\u0430\u0437\u0438\u043B\u044C\u0441\u044C\u043A\u0435 \u0431\u0456\u043A\u0456\u043D\u0456)",
      bikiniService2Duration: "40 \u0445\u0432 \u2013 1 \u0433\u043E\u0434\u0438\u043D\u0430",
      bikiniService2Desc: "\u041F\u043E\u0432\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0437 \u043C\u043E\u0436\u043B\u0438\u0432\u0456\u0441\u0442\u044E \u0437\u0430\u043B\u0438\u0448\u0438\u0442\u0438 \u043D\u0435\u0432\u0435\u043B\u0438\u043A\u0443 \u0430\u043A\u0443\u0440\u0430\u0442\u043D\u0443 \u0441\u043C\u0443\u0436\u043A\u0443 \u0447\u0438 \u0442\u0440\u0438\u043A\u0443\u0442\u043D\u0438\u043A \u0441\u043F\u0435\u0440\u0435\u0434\u0443, \u044F\u043A\u0449\u043E \u0432\u0430\u043C \u0442\u0430\u043A \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u0456\u0448\u0435. \u041E\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0446\u0435\u0439 \u0432\u0430\u0440\u0456\u0430\u043D\u0442, \u044F\u043A\u0449\u043E \u043F\u0440\u0430\u0433\u043D\u0435\u0442\u0435 \u0441\u0442\u0438\u043B\u0456\u0437\u043E\u0432\u0430\u043D\u043E\u0433\u043E \u0442\u0430 \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u043E\u0433\u043E \u0432\u0438\u0433\u043B\u044F\u0434\u0443.",
      bikiniService3Name: "G-String / \u0420\u043E\u0437\u0448\u0438\u0440\u0435\u043D\u0435 \u0431\u0456\u043A\u0456\u043D\u0456",
      bikiniService3Duration: "30 \u2013 40 \u0445\u0432",
      bikiniService3Desc: "\u0406\u0434\u0435\u0430\u043B\u044C\u043D\u0438\u0439 \u0441\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u0432\u0430\u0440\u0456\u0430\u043D\u0442 \u043C\u0456\u0436 \u043A\u043B\u0430\u0441\u0438\u0447\u043D\u0438\u043C \u0442\u0430 \u043F\u043E\u0432\u043D\u0438\u043C \u0431\u0456\u043A\u0456\u043D\u0456. \u0426\u0435 \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0438\u0439 \u0432\u0438\u0431\u0456\u0440 \u0434\u043B\u044F \u043F\u0435\u0440\u0448\u043E\u0433\u043E \u0432\u0456\u0437\u0438\u0442\u0443 \u0442\u0430 \u0434\u043B\u044F \u043A\u043B\u0456\u0454\u043D\u0442\u043E\u043A \u0456\u0437 \u0434\u0443\u0436\u0435 \u0447\u0443\u0442\u043B\u0438\u0432\u043E\u044E \u0448\u043A\u0456\u0440\u043E\u044E, \u044F\u043A\u0456 \u0445\u0432\u0438\u043B\u044E\u044E\u0442\u044C\u0441\u044F \u0447\u0435\u0440\u0435\u0437 \u0431\u043E\u043B\u044C\u043E\u0432\u0456 \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F, \u0430\u043B\u0435 \u043F\u0440\u0430\u0433\u043D\u0443\u0442\u044C \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u0443 \u043D\u0430 \u0432\u0456\u0434\u043F\u043E\u0447\u0438\u043D\u043A\u0443. \u0412\u043E\u043B\u043E\u0441\u0441\u044F \u0437\u0430\u0431\u0438\u0440\u0430\u0454\u0442\u044C\u0441\u044F \u0433\u043B\u0438\u0431\u0448\u0435 \u043B\u0456\u043D\u0456\u0457 \u0431\u0456\u043B\u0438\u0437\u043D\u0438: \u0447\u0430\u0441\u0442\u043A\u043E\u0432\u043E \u043D\u0430 \u043B\u043E\u0431\u043A\u0443 \u0442\u0430 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0432 \u043C\u0456\u0436\u0441\u0456\u0434\u043D\u0438\u0447\u043D\u0456\u0439 \u0441\u043A\u043B\u0430\u0434\u0446\u0456. \u041E\u0445\u0430\u0439\u043D\u0430 \u0441\u043C\u0443\u0436\u043A\u0430 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0437\u0430\u043B\u0438\u0448\u0430\u0454\u0442\u044C\u0441\u044F \u043D\u0430 \u043B\u043E\u0431\u043A\u0443 \u0442\u0430 \u0441\u043F\u0443\u0441\u043A\u0430\u0454\u0442\u044C\u0441\u044F \u043F\u043E \u0441\u0442\u0430\u0442\u0435\u0432\u0438\u0445 \u0433\u0443\u0431\u0430\u0445. \u0417\u0430\u0432\u0434\u044F\u043A\u0438 \u0446\u044C\u043E\u043C\u0443 \u0432\u0438 \u0437\u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E \u043D\u043E\u0441\u0438\u0442\u0438 \u0441\u0442\u0440\u0438\u043D\u0433\u0438, \u0456 \u0436\u043E\u0434\u043D\u0430 \u0432\u043E\u043B\u043E\u0441\u0438\u043D\u043A\u0430 \u043D\u0435 \u0432\u0438\u0437\u0438\u0440\u0430\u0442\u0438\u043C\u0435 \u0437-\u043F\u0456\u0434 \u0431\u0456\u043B\u0438\u0437\u043D\u0438.",
      bikiniService4Name: "\u041A\u043B\u0430\u0441\u0438\u0447\u043D\u0435 \u0431\u0456\u043A\u0456\u043D\u0456",
      bikiniService4Duration: "20 \u2013 30 \u0445\u0432",
      bikiniService4Desc: "\u0410\u043A\u0443\u0440\u0430\u0442\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430 \u0448\u0438\u0440\u0438\u043D\u0443 \u043F\u0440\u0438\u0431\u043B\u0438\u0437\u043D\u043E 4 \u043F\u0430\u043B\u044C\u0447\u0438\u043A\u0456\u0432 \u043F\u043E \u043A\u043E\u043D\u0442\u0443\u0440\u0443 \u0432\u0430\u0448\u043E\u0457 \u0431\u0456\u043B\u0438\u0437\u043D\u0438 \u0447\u0438 \u043A\u0443\u043F\u0430\u043B\u044C\u043D\u0438\u043A\u0430. \u0426\u0435 \u0434\u0443\u0436\u0435 \u043B\u0435\u0433\u043A\u0438\u0439 \u0442\u0430 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u0438\u0439 \u0432\u0430\u0440\u0456\u0430\u043D\u0442, \u044F\u043A\u0438\u0439 \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u043F\u0456\u0434\u0445\u043E\u0434\u0438\u0442\u044C \u0434\u043B\u044F \u0442\u0438\u0445, \u0445\u0442\u043E \u043C\u0430\u0454 \u0447\u0443\u0442\u043B\u0438\u0432\u0443 \u0448\u043A\u0456\u0440\u0443 \u0430\u0431\u043E \u0445\u043E\u0447\u0435 \u0432\u043F\u0435\u0440\u0448\u0435 \u0441\u043F\u0440\u043E\u0431\u0443\u0432\u0430\u0442\u0438 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443.",
      bikiniAddonGroupName: "\u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0456 \u043F\u043E\u0441\u043B\u0443\u0433\u0438",
      bikiniAddon1Name: "\u0414\u043E\u0432\u0433\u0435 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0430\u0431\u043E \u0431\u0456\u043B\u044C\u0448\u0456 \u0456\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u0438",
      bikiniAddon1Desc: "\u0414\u043E\u043F\u043B\u0430\u0442\u0430 \u0434\u0456\u0454, \u044F\u043A\u0449\u043E \u043F\u0456\u0441\u043B\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u043E\u0441\u0442\u0430\u043D\u043D\u044C\u043E\u0433\u043E \u0433\u043E\u043B\u0456\u043D\u043D\u044F \u043F\u0440\u043E\u0439\u0448\u043B\u043E \u043F\u043E\u043D\u0430\u0434 4 \u0442\u0438\u0436\u043D\u0456, \u0430\u0431\u043E \u043F\u043E\u043D\u0430\u0434 7\u20138 \u0442\u0438\u0436\u043D\u0456\u0432 \u043F\u0456\u0441\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u043E\u0441\u0442\u0430\u043D\u043D\u044C\u043E\u0457 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457. \u0414\u043E\u043F\u043B\u0430\u0442\u0430 \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0430\u0454 \u0434\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0438\u0439 \u0447\u0430\u0441 \u0456 \u0442\u0435\u0445\u043D\u0456\u043A\u0443 \u0440\u043E\u0431\u043E\u0442\u0438 \u2014 \u043D\u0430\u0442\u043E\u043C\u0456\u0441\u0442\u044C \u0432\u0438 \u043E\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u0435 \u0437\u043D\u0430\u0447\u043D\u043E \u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u044C\u0442\u0435 \u043C\u0435\u043D\u0435 \u043F\u0440\u043E \u0432\u0430\u0448\u0443 \u043F\u043E\u0442\u043E\u0447\u043D\u0443 \u0434\u043E\u0432\u0436\u0438\u043D\u0443 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043F\u0435\u0440\u0435\u0434 \u0432\u0456\u0437\u0438\u0442\u043E\u043C.",
      bikiniAddon1ExtendedDesc: "\u0413\u043E\u043B\u043E\u0432\u043D\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E: \u0414\u043E\u043F\u043B\u0430\u0442\u0430 \u0434\u0456\u0454, \u044F\u043A\u0449\u043E \u043F\u0456\u0441\u043B\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u043E\u0441\u0442\u0430\u043D\u043D\u044C\u043E\u0433\u043E \u0433\u043E\u043B\u0456\u043D\u043D\u044F \u043F\u0440\u043E\u0439\u0448\u043B\u043E \u043F\u043E\u043D\u0430\u0434 4 \u0442\u0438\u0436\u043D\u0456, \u0430\u0431\u043E \u043F\u043E\u043D\u0430\u0434 7\u20138 \u0442\u0438\u0436\u043D\u0456\u0432 \u043F\u0456\u0441\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u043E\u0441\u0442\u0430\u043D\u043D\u044C\u043E\u0457 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457.\n\n\u0427\u043E\u043C\u0443 \u0446\u0435 \u0442\u0430\u043A? \u0420\u043E\u0431\u043E\u0442\u0430 \u0437 \u0434\u043E\u0432\u0433\u0438\u043C \u0432\u043E\u043B\u043E\u0441\u0441\u044F\u043C \u0430\u0431\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u043C\u0438 \u0456\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u0430\u043C\u0438 \u0432\u0438\u043C\u0430\u0433\u0430\u0454 \u0431\u0456\u043B\u044C\u0448\u0435 \u0447\u0430\u0441\u0443 \u0442\u0430 \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u043E\u0457 \u0442\u0435\u0445\u043D\u0456\u0447\u043D\u043E\u0441\u0442\u0456.\n\n\u0412\u0430\u0448 \u0431\u043E\u043D\u0443\u0441: \u0412\u0435\u043B\u0438\u043A\u0438\u0439 \u043F\u043B\u044E\u0441 \u0442\u0430\u043A\u043E\u0433\u043E \u0432\u0430\u0440\u0456\u0430\u043D\u0442\u0443 \u2014 \u0432\u0438 \u043E\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u0435 \u0437\u043D\u0430\u0447\u043D\u043E \u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442, \u0430\u0434\u0436\u0435 \u043C\u0438 \u0437\u0430\u0431\u0438\u0440\u0430\u0454\u043C\u043E \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0443 \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0432\u043E\u043B\u043E\u0441\u0438\u043D, \u044F\u043A\u0456 \u0437'\u044F\u0432\u0438\u043B\u0438\u0441\u044F.\n\n\u041F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430: \u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0438\u0439 \u0456\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0434\u043B\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0438\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432 \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C 4\u20135\u20136 \u0442\u0438\u0436\u043D\u0456\u0432. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u044C\u0442\u0435 \u043C\u0435\u043D\u0435 \u043F\u0440\u043E \u0432\u0430\u0448\u0443 \u043F\u043E\u0442\u043E\u0447\u043D\u0443 \u0434\u043E\u0432\u0436\u0438\u043D\u0443 \u043F\u0435\u0440\u0435\u0434 \u0432\u0456\u0437\u0438\u0442\u043E\u043C, \u0456 \u044F \u043F\u0456\u0434\u043A\u0430\u0436\u0443, \u044F\u043A \u043A\u0440\u0430\u0449\u0435 \u0437\u0440\u043E\u0431\u0438\u0442\u0438. \u0412\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u043A\u043E\u0440\u0438\u0433\u0443\u0454\u0442\u044C\u0441\u044F \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u043E \u0437\u0430\u043B\u0435\u0436\u043D\u043E \u0432\u0456\u0434 \u0441\u043A\u043B\u0430\u0434\u043D\u043E\u0441\u0442\u0456 \u0440\u043E\u0431\u043E\u0442\u0438 \u0456 \u0447\u0430\u0441\u0443.",
      bikiniAddon2Name: "\u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0430 \u0437\u043E\u043D\u0430",
      bikiniAddon2Desc: "\u0414\u043B\u044F \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043F\u043E\u043E\u0434\u0438\u043D\u043E\u043A\u0438\u0445 \u0432\u043E\u043B\u043E\u0441\u0438\u043D \u0430\u0431\u043E \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0445 \u0434\u0456\u043B\u044F\u043D\u043E\u043A \u043F\u043E\u0437\u0430 \u043C\u0435\u0436\u0430\u043C\u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u043E\u0433\u043E \u043F\u0440\u0430\u0439\u0441\u0443 \u2014 \u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u043A\u0456\u043B\u044C\u043A\u0430 \u0442\u0435\u043C\u043D\u0438\u0445 \u0432\u043E\u043B\u043E\u0441\u0438\u043D \u043D\u0430 \u0437\u0430\u0434\u043D\u0456\u0439 \u0447\u0430\u0441\u0442\u0438\u043D\u0456 \u0441\u0442\u0435\u0433\u043D\u0430 \u0430\u0431\u043E \u043D\u0435\u0432\u0435\u043B\u0438\u043A\u0430 \u0434\u0456\u043B\u044F\u043D\u043A\u0430 \u0442\u0440\u043E\u0445\u0438 \u0433\u043B\u0438\u0431\u0448\u0435 \u043D\u0430 \u0441\u0456\u0434\u043D\u0438\u0446\u044F\u0445.",
      bikiniAddon2ExtendedDesc: "\u0413\u043E\u043B\u043E\u0432\u043D\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E: \u0426\u044F \u043F\u043E\u0437\u0438\u0446\u0456\u044F \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u0430 \u0434\u043B\u044F \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043F\u043E\u043E\u0434\u0438\u043D\u043E\u043A\u0438\u0445 \u0432\u043E\u043B\u043E\u0441\u0438\u043D \u0430\u0431\u043E \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0445 \u0434\u0456\u043B\u044F\u043D\u043E\u043A \u043F\u043E\u0437\u0430 \u043C\u0435\u0436\u0430\u043C\u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u043E\u0433\u043E \u043F\u0440\u0430\u0439\u0441\u0443.\n\n\u0417\u0432\u0435\u0440\u043D\u0456\u0442\u044C \u0443\u0432\u0430\u0433\u0443: \u0423 \u043A\u043B\u0430\u0441\u0438\u0447\u043D\u0443 \u0437\u043E\u043D\u0443 \u0431\u0456\u043A\u0456\u043D\u0456 \u043D\u0435 \u0432\u0445\u043E\u0434\u0438\u0442\u044C \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430 \u0441\u0456\u0434\u043D\u0438\u0446\u044F\u0445, \u0430 \u0442\u0430\u043A\u043E\u0436 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430 \u0441\u0442\u0435\u0433\u043D\u0430\u0445, \u044F\u043A\u0435 \u0440\u043E\u0441\u0442\u0435 \u0434\u0430\u043B\u0456, \u043D\u0456\u0436 \u043D\u0430 4 \u0444\u0430\u043B\u0430\u043D\u0433\u0438 \u043F\u0430\u043B\u044C\u0446\u0456\u0432.\n\n\u041A\u043E\u043B\u0438 \u043E\u0431\u0438\u0440\u0430\u0442\u0438 \u0446\u044E \u043F\u043E\u0441\u043B\u0443\u0433\u0443: \u042F\u043A\u0449\u043E \u0443 \u0432\u0430\u0441 \u0454 \u043F\u043E\u0442\u0440\u0435\u0431\u0430 \u0434\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u043E \u043F\u0440\u0438\u0431\u0440\u0430\u0442\u0438 \u0449\u043E\u0441\u044C \u043D\u0435\u0432\u0435\u043B\u0438\u043A\u0435. \u041D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434: \u043F\u043E\u043E\u0434\u0438\u043D\u043E\u043A\u0435 \u0434\u043E\u0432\u0433\u0435 \u0442\u0435\u043C\u043D\u0435 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430 \u0437\u0430\u0434\u043D\u0456\u0439 \u0447\u0430\u0441\u0442\u0438\u043D\u0456 \u0441\u0442\u0435\u0433\u043D\u0430, \u0430\u0431\u043E \u0447\u0430\u0441\u0442\u043A\u043E\u0432\u043E \u0442\u0440\u043E\u0445\u0438 \u0433\u043B\u0438\u0431\u0448\u0435 \u043D\u0430 \u0441\u0456\u0434\u043D\u0438\u0446\u044F\u0445 (\u0430\u043B\u0435 \u043D\u0435 \u0441\u0456\u0434\u043D\u0438\u0446\u0456 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E).",
      bikiniAddon3Name: "\u041B\u0456\u043D\u0456\u044F \u0436\u0438\u0432\u043E\u0442\u0430",
      bikiniAddon3Desc: "\u0410\u043A\u0443\u0440\u0430\u0442\u043D\u0430 \u0434\u043E\u0440\u0456\u0436\u043A\u0430 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432\u0456\u0434 \u043F\u0443\u043F\u043A\u0430 \u0434\u043E \u043B\u0456\u043D\u0456\u0457 \u0431\u0456\u043A\u0456\u043D\u0456.",
      // Upper Body
      upperFullLabel: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0432\u0435\u0440\u0445\u043D\u044C\u043E\u0457 \u0447\u0430\u0441\u0442\u0438\u043D\u0438 \u0442\u0456\u043B\u0430",
      upperTagline: "\u0428\u043E\u0432\u043A\u043E\u0432\u0430 \u0436\u0456\u043D\u043E\u0447\u043D\u0456\u0441\u0442\u044C \u2014 \u0432\u0456\u0434 \u043A\u0456\u043D\u0447\u0438\u043A\u0456\u0432 \u043F\u0430\u043B\u044C\u0446\u0456\u0432 \u0434\u043E \u043F\u043B\u0435\u0447\u0435\u0439.",
      upperService1Name: "\u041F\u0430\u0445\u0432\u0438",
      upperService1Duration: "10 \u2013 15 \u0445\u0432",
      upperService1Desc: "\u041F\u043E\u0432\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432 \u0437\u043E\u043D\u0456 \u043F\u0430\u0445\u0432 \u0434\u043B\u044F \u0442\u0440\u0438\u0432\u0430\u043B\u043E\u0433\u043E \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F \u0447\u0438\u0441\u0442\u043E\u0442\u0438, \u0441\u0432\u0456\u0436\u043E\u0441\u0442\u0456 \u0442\u0430 \u0433\u043B\u0430\u0434\u043A\u043E\u0441\u0442\u0456.",
      upperService2Name: "\u0420\u0443\u043A\u0438 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E",
      upperService2Duration: "1 \u0433\u043E\u0434\u0438\u043D\u0430",
      upperService2Desc: "\u041F\u043E\u0432\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043F\u043E \u0432\u0441\u0456\u0439 \u0434\u043E\u0432\u0436\u0438\u043D\u0456 \u0440\u0443\u043A \u0432\u0456\u0434 \u043F\u043B\u0435\u0447\u0435\u0439 \u0434\u043E \u0437\u0430\u043F'\u044F\u0441\u0442\u043A\u0456\u0432, \u0432\u043A\u043B\u044E\u0447\u0430\u044E\u0447\u0438 \u043A\u0438\u0441\u0442\u0456.",
      upperService3Name: "\u0420\u0443\u043A\u0438 \u0434\u043E \u043B\u0456\u043A\u0442\u044F",
      upperService3Duration: "30 \u2013 40 \u0445\u0432",
      upperService3Desc: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432\u0456\u0434 \u043B\u0456\u043A\u0442\u044F \u0434\u043E \u043A\u0456\u043D\u0447\u0438\u043A\u0456\u0432 \u043F\u0430\u043B\u044C\u0446\u0456\u0432 \u0440\u0443\u043A, \u0434\u0435 \u0437\u043E\u043D\u0430 \u043B\u0456\u043A\u0442\u044F \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0432\u043A\u043B\u044E\u0447\u0430\u0454\u0442\u044C\u0441\u044F \u0443 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438.",
      upperService4Name: "\u0416\u0438\u0432\u0456\u0442",
      upperService4Duration: "15 \u2013 20 \u0445\u0432",
      upperService4Desc: "\u041F\u043E\u0432\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043F\u043E \u0432\u0441\u0456\u0439 \u0437\u043E\u043D\u0456 \u0436\u0438\u0432\u043E\u0442\u0430 \u0434\u043B\u044F \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0433\u043B\u0430\u0434\u0435\u043D\u044C\u043A\u043E\u0457 \u0448\u043A\u0456\u0440\u0438.",
      upperAddon1Name: "\u0417\u043E\u043D\u0430 \u0441\u043E\u0441\u043A\u0456\u0432",
      upperAddon1Duration: "5 \u2013 10 \u0445\u0432",
      upperAddon1Desc: "\u0414\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0435 \u0442\u0430 \u0442\u043E\u0447\u043A\u043E\u0432\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0431\u0435\u0437\u043F\u043E\u0441\u0435\u0440\u0435\u0434\u043D\u044C\u043E \u043D\u0430\u0432\u043A\u043E\u043B\u043E \u0437\u043E\u043D\u0438 \u0441\u043E\u0441\u043A\u0456\u0432.",
      upperAddon2Name: "\u0422\u0456\u043B\u044C\u043A\u0438 \u043F\u0430\u043B\u044C\u0446\u0456",
      upperAddon2Duration: "5 \u2013 10 \u0445\u0432",
      upperAddon2Desc: "\u0428\u0432\u0438\u0434\u043A\u0435 \u0442\u0430 \u0442\u043E\u0447\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043D\u0435\u0431\u0430\u0436\u0430\u043D\u043E\u0433\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432\u0438\u043A\u043B\u044E\u0447\u043D\u043E \u043D\u0430 \u043F\u0430\u043B\u044C\u0446\u044F\u0445 \u043E\u0431\u043E\u0445 \u0440\u0443\u043A.",
      // Down Body
      downFullLabel: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043D\u0438\u0436\u043D\u044C\u043E\u0457 \u0447\u0430\u0441\u0442\u0438\u043D\u0438 \u0442\u0456\u043B\u0430",
      downTagline: "\u0412\u0456\u0434 \u0442\u0430\u043B\u0456\u0457 \u0434\u043E \u043A\u0456\u043D\u0447\u0438\u043A\u0456\u0432 \u043F\u0430\u043B\u044C\u0446\u0456\u0432 \u043D\u0456\u0433 \u2014 \u043B\u0435\u0433\u043A\u043E \u0442\u0430 \u0431\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u043E \u0433\u043B\u0430\u0434\u043A\u043E.",
      downService1Name: "\u041F\u043E\u0432\u043D\u0456 \u043D\u043E\u0433\u0438 (\u0432\u043A\u043B\u044E\u0447\u043D\u043E \u0437 \u043F\u0430\u043B\u044C\u0446\u044F\u043C\u0438)",
      downService1Duration: "1 \u2013 1,5 \u0433\u043E\u0434\u0438\u043D\u0438",
      downService1Desc: "\u041F\u043E\u0432\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432\u0456\u0434 \u0441\u0430\u043C\u043E\u0433\u043E \u0432\u0435\u0440\u0445\u0443 \u0441\u0442\u0435\u0433\u043E\u043D \u0434\u043E \u043A\u0456\u043D\u0447\u0438\u043A\u0456\u0432 \u043F\u0430\u043B\u044C\u0446\u0456\u0432 \u043D\u0456\u0433. \u0417\u0432\u0435\u0440\u043D\u0456\u0442\u044C \u0443\u0432\u0430\u0433\u0443: \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F \u0437\u043E\u043D\u0438 \u0431\u0456\u043A\u0456\u043D\u0456 \u043F\u043E \u043B\u0456\u043D\u0456\u0457 \u0431\u0456\u043B\u0438\u0437\u043D\u0438 \u043D\u0435 \u0432\u0445\u043E\u0434\u0438\u0442\u044C \u0443 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u0446\u0456\u0454\u0457 \u043F\u043E\u0441\u043B\u0443\u0433\u0438.",
      downService2Name: "\u0427\u0430\u0441\u0442\u0438\u043D\u0430 \u043D\u0456\u0433 (\u0432\u043A\u043B\u044E\u0447\u043D\u043E \u0437 \u043F\u0430\u043B\u044C\u0446\u044F\u043C\u0438)",
      downService2Duration: "30 \u2013 45 \u0445\u0432",
      downService2Desc: "\u0412\u0430\u0448 \u0432\u0438\u0431\u0456\u0440: \u0413\u043E\u043C\u0456\u043B\u043A\u0438 (\u0432\u0456\u0434 \u043A\u043E\u043B\u0456\u043D\u0430 \u0432\u043D\u0438\u0437 \u0434\u043E \u043A\u0456\u043D\u0447\u0438\u043A\u0456\u0432 \u043F\u0430\u043B\u044C\u0446\u0456\u0432 \u043D\u0456\u0433) \u0430\u0431\u043E \u0421\u0442\u0435\u0433\u043D\u0430 (\u0432\u0456\u0434 \u0441\u0430\u043C\u043E\u0433\u043E \u0432\u0435\u0440\u0445\u0443 \u0434\u043E \u043A\u043E\u043B\u0456\u043D\u0430).",
      downService3Name: "\u0421\u0456\u0434\u043D\u0438\u0446\u0456",
      downService3Duration: "15 \u2013 20 \u0445\u0432",
      downService3Desc: "\u041F\u043E\u0432\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430 \u0441\u0456\u0434\u043D\u0438\u0446\u044F\u0445, \u0449\u043E \u0440\u043E\u0431\u0438\u0442\u044C \u0448\u043A\u0456\u0440\u0443 \u0433\u043B\u0430\u0434\u043A\u043E\u044E \u0442\u0430 \u0448\u043E\u0432\u043A\u043E\u0432\u0438\u0441\u0442\u043E\u044E.",
      downService4Name: "\u041F\u043E\u043F\u0435\u0440\u0435\u043A",
      downService4Duration: "15 \u2013 20 \u0445\u0432",
      downService4Desc: "\u0410\u043A\u0443\u0440\u0430\u0442\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432 \u0437\u043E\u043D\u0456 \u043F\u043E\u043F\u0435\u0440\u0435\u043A\u0443 \u2014 \u0432\u0456\u0434 \u043B\u0456\u043D\u0456\u0457 \u0442\u0430\u043B\u0456\u0457 \u0432\u043D\u0438\u0437 \u0434\u043E \u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0441\u0456\u0434\u043D\u0438\u0446\u044C.",
      downService5Name: "\u041F\u043E\u043F\u0435\u0440\u0435\u043A + \u0421\u0456\u0434\u043D\u0438\u0446\u0456 (\u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441)",
      downService5Badge: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441",
      downService5Duration: "30 \u2013 40 \u0445\u0432",
      downService5Desc: "\u0412\u0438\u0433\u0456\u0434\u043D\u0438\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441, \u044F\u043A\u0438\u0439 \u043F\u043E\u0454\u0434\u043D\u0443\u0454 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044E \u043F\u043E\u043F\u0435\u0440\u0435\u043A\u0443 \u0442\u0430 \u0441\u0456\u0434\u043D\u0438\u0446\u044C \u0434\u043B\u044F \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0433\u043B\u0430\u0434\u043A\u043E\u0433\u043E \u0441\u0438\u043B\u0443\u0435\u0442\u0443.",
      downAddon1Name: "\u0422\u0456\u043B\u044C\u043A\u0438 \u043F\u0430\u043B\u044C\u0446\u0456 \u043D\u0456\u0433",
      downAddon1Duration: "10 \u0445\u0432",
      downAddon1Desc: "\u0428\u0432\u0438\u0434\u043A\u0430 \u043E\u043A\u0440\u0435\u043C\u0430 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u0434\u043B\u044F \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430 \u0441\u0442\u043E\u043F\u0430\u0445 \u0442\u0430 \u043F\u0430\u043B\u044C\u0446\u044F\u0445 \u043D\u0456\u0433.",
      // Face
      faceFullLabel: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0438\u0447\u0447\u044F",
      faceTagline: "\u0422\u043E\u0447\u043D\u0438\u0439, \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0438\u0439 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0434\u043B\u044F \u043A\u043E\u0436\u043D\u043E\u0457 \u043D\u0456\u0436\u043D\u043E\u0457 \u0437\u043E\u043D\u0438 \u043E\u0431\u043B\u0438\u0447\u0447\u044F.",
      faceGroupIndividual: "\u041E\u043A\u0440\u0435\u043C\u0456 \u0437\u043E\u043D\u0438",
      faceService1Name: "\u0412\u0435\u0440\u0445\u043D\u044F \u0433\u0443\u0431\u0430",
      faceService1Duration: "15\u201320 \u0445\u0432",
      faceService1Desc: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043F\u0443\u0448\u043A\u0443 \u0442\u0430 \u0436\u043E\u0440\u0441\u0442\u043A\u043E\u0433\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430\u0434 \u0433\u0443\u0431\u043E\u044E.",
      faceService2Name: "\u041F\u0456\u0434\u0431\u043E\u0440\u0456\u0434\u0434\u044F",
      faceService2Duration: "10\u201315 \u0445\u0432",
      faceService2Desc: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432 \u0437\u043E\u043D\u0456 \u043F\u0456\u0434\u0431\u043E\u0440\u0456\u0434\u0434\u044F \u0442\u0430 \u043F\u0456\u0434 \u043D\u0438\u0436\u043D\u044C\u043E\u044E \u0449\u0435\u043B\u0435\u043F\u043E\u044E.",
      faceService3Name: "\u041F\u043E\u0440\u0438 \u043D\u043E\u0441\u0430",
      faceService3Duration: "15\u201320 \u0445\u0432",
      faceService3Desc: "\u0413\u043B\u0438\u0431\u043E\u043A\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u0448\u043A\u0456\u0440\u0438 \u043D\u043E\u0441\u0430 \u0432\u0456\u0434 \u0447\u043E\u0440\u043D\u0438\u0445 \u0446\u044F\u0442\u043E\u043A \u0446\u0443\u043A\u0440\u043E\u0432\u043E\u044E \u043F\u0430\u0441\u0442\u043E\u044E.",
      faceService4Name: "\u041D\u0456\u0437\u0434\u0440\u0456",
      faceService4Duration: "15\u201320 \u0445\u0432",
      faceService4Desc: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0443\u0441\u044C\u043E\u0433\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432\u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0456 \u043D\u043E\u0441\u0430. \u0426\u0435 \u043D\u0435 \u0442\u0456\u043B\u044C\u043A\u0438 \u043F\u0440\u043E \u0435\u0441\u0442\u0435\u0442\u0438\u0447\u043D\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442, \u0430 \u0439 \u043F\u0440\u043E \u0442\u0435, \u0449\u043E \u0432\u0430\u043C \u0441\u0442\u0430\u0454 \u0434\u0443\u0436\u0435 \u043B\u0435\u0433\u043A\u043E \u0434\u0438\u0445\u0430\u0442\u0438.",
      faceService5Name: "\u0411\u0440\u043E\u0432\u0438",
      faceService5Duration: "30\u201340 \u0445\u0432",
      faceService5Desc: "\u041E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u0437\u043E\u043D\u0438 \u043D\u0430\u0432\u043A\u043E\u043B\u043E \u0431\u0440\u0456\u0432 \u0446\u0443\u043A\u0440\u043E\u0432\u043E\u044E \u043F\u0430\u0441\u0442\u043E\u044E. \u0421\u0442\u0432\u043E\u0440\u044E\u0454 \u0447\u0438\u0441\u0442\u0443 \u0440\u0430\u043C\u043A\u0443, \u0440\u043E\u0431\u0438\u0442\u044C \u0432\u0430\u0448\u0456 \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u0456 \u0431\u0440\u043E\u0432\u0438 \u0447\u0456\u0442\u043A\u0456\u0448\u0438\u043C\u0438 \u0442\u0430 \u0432\u0438\u0440\u0430\u0437\u043D\u0456\u0448\u0438\u043C\u0438.",
      faceService6Name: "\u0411\u0430\u043A\u0435\u043D\u0431\u0430\u0440\u0434\u0438",
      faceService6Duration: "20\u201325 \u0445\u0432",
      faceService6Desc: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432 \u0437\u043E\u043D\u0456 \u0431\u0456\u043B\u044F \u0432\u0443\u0445 \u0442\u0430 \u0432\u0437\u0434\u043E\u0432\u0436 \u043B\u0456\u043D\u0456\u0457 \u0449\u0435\u043B\u0435\u043F\u0438.",
      faceService7Name: "\u0428\u0438\u044F",
      faceService7Duration: "15\u201320 \u0445\u0432",
      faceService7Desc: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043D\u0435\u0431\u0430\u0436\u0430\u043D\u043E\u0433\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430 \u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u0442\u0430 \u0431\u043E\u043A\u043E\u0432\u0438\u0445 \u0447\u0430\u0441\u0442\u0438\u043D\u0430\u0445 \u0448\u0438\u0457.",
      faceService8Name: "\u041F\u043E\u0442\u0438\u043B\u0438\u0446\u044F",
      faceService8Duration: "15\u201320 \u0445\u0432",
      faceService8Desc: "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0447\u0456\u0442\u043A\u043E\u0457 \u043B\u0456\u043D\u0456\u0457 \u0440\u043E\u0441\u0442\u0443 \u0432\u043E\u043B\u043E\u0441\u0441\u044F. \u0412\u0438\u0434\u0430\u043B\u044F\u0454\u0442\u044C\u0441\u044F \u0432\u0441\u0435 \u0434\u0440\u0456\u0431\u043D\u0435, \u043A\u043E\u0440\u043E\u0442\u043A\u0435 \u0442\u0430 \u043F\u0443\u0448\u043A\u043E\u0432\u0435 \u0432\u043E\u043B\u043E\u0441\u0441\u044F, \u0449\u043E\u0431 \u0432\u0430\u0448\u0430 \u0441\u0442\u0440\u0438\u0436\u043A\u0430 \u0447\u0438 \u0437\u0430\u0447\u0456\u0441\u043A\u0430 \u0432\u0438\u0433\u043B\u044F\u0434\u0430\u043B\u0438 \u0431\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u043E.",
      faceGroupCombos: "\u041C\u0456\u043D\u0456-\u043A\u043E\u043C\u0431\u043E",
      faceCombo1Name: "\u041A\u043E\u043C\u0431\u043E 1 \u2014 \u0414\u043E\u0433\u043B\u044F\u0434 \u0437\u0430 \u043D\u0438\u0436\u043D\u044C\u043E\u044E \u0447\u0430\u0441\u0442\u0438\u043D\u043E\u044E \u043E\u0431\u043B\u0438\u0447\u0447\u044F",
      faceCombo1Badge: "\u041D\u0430\u0439\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u0456\u0448\u0435",
      faceCombo1Duration: "25\u201330 \u0445\u0432",
      faceCombo1Desc: "(\u0412\u0435\u0440\u0445\u043D\u044F \u0433\u0443\u0431\u0430 + \u041F\u0456\u0434\u0431\u043E\u0440\u0456\u0434\u0434\u044F) \u2014 \u041D\u0430\u0439\u0447\u0430\u0441\u0442\u0456\u0448\u0438\u0439 \u0432\u0438\u0431\u0456\u0440 \u043C\u043E\u0457\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u043E\u043A \u0434\u043B\u044F \u0431\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u043E\u0457 \u0433\u043B\u0430\u0434\u043A\u043E\u0441\u0442\u0456.",
      faceCombo2Name: "\u041A\u043E\u043C\u0431\u043E 2 \u2014 \u041F\u043E\u0432\u043D\u0438\u0439 \u0434\u043E\u0433\u043B\u044F\u0434 \u0437\u0430 \u043D\u043E\u0441\u043E\u043C",
      faceCombo2Duration: "30\u201335 \u0445\u0432",
      faceCombo2Desc: "(\u041F\u043E\u0440\u0438 \u043D\u043E\u0441\u0430 + \u041D\u0456\u0437\u0434\u0440\u0456) \u2014 \u0420\u0435\u0442\u0435\u043B\u044C\u043D\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u043F\u043E\u0440 \u0437\u0437\u043E\u0432\u043D\u0456 \u0442\u0430 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432\u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0456.",
      faceCombo3Name: "\u041A\u043E\u043C\u0431\u043E 3 \u2014 \u0414\u043E\u0433\u043B\u044F\u0434 \u0437\u0430 \u0422-\u0437\u043E\u043D\u043E\u044E",
      faceCombo3Duration: "40\u201345 \u0445\u0432",
      faceCombo3Desc: "(\u0411\u0440\u043E\u0432\u0438 + \u041F\u043E\u0440\u0438 \u043D\u043E\u0441\u0430) \u2014 \u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u0438\u0439 \u0434\u0443\u0435\u0442 \u0434\u043B\u044F \u043E\u0431\u043B\u0438\u0447\u0447\u044F: \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0430 \u043A\u043E\u0440\u0435\u043A\u0446\u0456\u044F \u0431\u0440\u0456\u0432 \u0442\u0430 \u043E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u043F\u043E\u0440.",
      faceCombo4Name: "\u041A\u043E\u043C\u0431\u043E 4 \u2014 \u0406\u0434\u0435\u0430\u043B\u044C\u043D\u0438\u0439 \u043A\u043E\u043D\u0442\u0443\u0440 \u043E\u0431\u043B\u0438\u0447\u0447\u044F",
      faceCombo4Badge: "\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u0430 \u043F\u0440\u043E\u043F\u043E\u0437\u0438\u0446\u0456\u044F",
      faceCombo4Duration: "35\u201340 \u0445\u0432",
      faceCombo4Desc: "(\u0412\u0435\u0440\u0445\u043D\u044F \u0433\u0443\u0431\u0430 + \u041F\u0456\u0434\u0431\u043E\u0440\u0456\u0434\u0434\u044F + \u0411\u0430\u043A\u0435\u043D\u0431\u0430\u0440\u0434\u0438) \u2014 \u0421\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u0430 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u0430 \u043F\u0440\u043E\u043F\u043E\u0437\u0438\u0446\u0456\u044F \u0434\u043B\u044F \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E\u0457 \u0433\u043B\u0430\u0434\u043A\u043E\u0441\u0442\u0456 \u0442\u0430 \u0447\u0456\u0442\u043A\u0438\u0445 \u043B\u0456\u043D\u0456\u0439.",
      faceGroupPremium: "\u041F\u0440\u0435\u043C\u0456\u0443\u043C-\u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0438",
      facePremium1Name: "\u041F\u0440\u0435\u043C\u0456\u0443\u043C 1 \u2014 \u041F\u043E\u0432\u043D\u0438\u0439 \u0434\u043E\u0433\u043B\u044F\u0434 \u0437\u0430 \u043E\u0431\u043B\u0438\u0447\u0447\u044F\u043C",
      facePremium1Duration: "1,5\u20132 \u0433\u043E\u0434",
      facePremium1Desc: "(\u0412\u0441\u0435 \u043E\u0431\u043B\u0438\u0447\u0447\u044F + \u0411\u0440\u043E\u0432\u0438) \u2014 \u0410\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u0430 \u0433\u043B\u0430\u0434\u043A\u0456\u0441\u0442\u044C \u0443\u0441\u0456\u0445 \u0437\u043E\u043D, \u043C\u043E\u0434\u0435\u043B\u044E\u0432\u0430\u043D\u043D\u044F \u0431\u0440\u0456\u0432 \u0442\u0430 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0438\u0439 \u0434\u043E\u0433\u043B\u044F\u0434 \u0456\u0437 \u0437\u0430\u0441\u043F\u043E\u043A\u0456\u0439\u043B\u0438\u0432\u043E\u044E \u043C\u0430\u0441\u043A\u043E\u044E.",
      facePremium2Name: "\u041F\u0440\u0435\u043C\u0456\u0443\u043C 2 \u2014 \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0435 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F: \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u0442\u0430 \u043F\u043E\u0442\u0438\u043B\u0438\u0446\u044F",
      facePremium2Duration: "2\u20132,5 \u0433\u043E\u0434",
      facePremium2Desc: "(\u0412\u0441\u0435 \u043E\u0431\u043B\u0438\u0447\u0447\u044F + \u041F\u043E\u0442\u0438\u043B\u0438\u0446\u044F) \u2014 \u0413\u043B\u0430\u0434\u043A\u0456\u0441\u0442\u044C \u043E\u0431\u043B\u0438\u0447\u0447\u044F, \u043C\u043E\u0434\u0435\u043B\u044E\u0432\u0430\u043D\u043D\u044F \u0431\u0440\u0456\u0432 \u0442\u0430 \u043B\u0456\u043D\u0456\u044F \u0440\u043E\u0441\u0442\u0443 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0437\u0437\u0430\u0434\u0443 \u0443 \u043F\u043E\u0454\u0434\u043D\u0430\u043D\u043D\u0456 \u0437 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0438\u043C \u0434\u043E\u0433\u043B\u044F\u0434\u043E\u043C \u0442\u0430 \u043C\u0430\u0441\u043A\u043E\u044E.",
      facePremium3Name: "\u041F\u0440\u0435\u043C\u0456\u0443\u043C 3 \u2014 \u041A\u043E\u0440\u043E\u043B\u0456\u0432\u0441\u044C\u043A\u0438\u0439 \u0434\u043E\u0433\u043B\u044F\u0434: \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u0442\u0430 \u0448\u0438\u044F",
      facePremium3Duration: "2\u20132,5 \u0433\u043E\u0434",
      facePremium3Desc: "(\u0412\u0441\u0435 \u043E\u0431\u043B\u0438\u0447\u0447\u044F + \u0428\u0438\u044F) \u2014 \u0411\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u0438\u0439 \u043A\u043E\u043D\u0442\u0443\u0440 \u043E\u0431\u043B\u0438\u0447\u0447\u044F, \u0431\u0440\u0456\u0432 \u0442\u0430 \u0448\u0438\u0457 \u0443 \u043F\u043E\u0454\u0434\u043D\u0430\u043D\u043D\u0456 \u0437 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0438\u043C \u0434\u043E\u0433\u043B\u044F\u0434\u043E\u043C \u0442\u0430 \u0437\u0430\u0441\u043F\u043E\u043A\u0456\u0439\u043B\u0438\u0432\u043E\u044E \u043C\u0430\u0441\u043A\u043E\u044E.",
      // Face care guide
      faceCareGuideToggle: "\u0412\u0430\u0436\u043B\u0438\u0432\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044E \u043E\u0431\u043B\u0438\u0447\u0447\u044F",
      faceGuideIntro1: "\u0414\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u2014 \u0446\u0435 \u0434\u0443\u0436\u0435 \u0442\u043E\u043D\u043A\u0430 \u0442\u0430 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u043B\u044C\u043D\u0430 \u0440\u043E\u0431\u043E\u0442\u0430. \u041F\u0440\u0430\u0446\u044E\u044E\u0447\u0438 \u0437 \u0446\u0456\u0454\u044E \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u043E\u044E \u0437\u043E\u043D\u043E\u044E, \u044F \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E \u0432\u043B\u0430\u0441\u043D\u0443 \u0430\u0432\u0442\u043E\u0440\u0441\u044C\u043A\u0443 \u043C\u0435\u0442\u043E\u0434\u0438\u043A\u0443. \u0412\u043E\u043D\u0430 \u0437\u043D\u0430\u0447\u043D\u043E \u043B\u0430\u0433\u0456\u0434\u043D\u0456\u0448\u0430 \u0442\u0430 \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u0456\u0448\u0430 \u0434\u043B\u044F \u0448\u043A\u0456\u0440\u0438, \u043D\u0456\u0436 \u0437\u0432\u0438\u0447\u0430\u0439\u043D\u0456 \u0442\u0435\u0445\u043D\u0456\u043A\u0438.",
      faceGuideIntro2: "\u0417\u0430 \u043C\u043E\u0457\u043C\u0438 \u043F\u043B\u0435\u0447\u0438\u043C\u0430 \u2014 8 \u0440\u043E\u043A\u0456\u0432 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u043E\u0433\u043E \u0434\u043E\u0441\u0432\u0456\u0434\u0443. \u0422\u043E\u043C\u0443 \u044F \u0442\u043E\u0447\u043D\u043E \u0437\u043D\u0430\u044E, \u0449\u043E \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u0454 \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u043E\u0457 \u0443\u0432\u0430\u0433\u0438. \u0414\u043B\u044F \u043C\u0435\u043D\u0435 \u0446\u0435 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043C\u0435\u0445\u0430\u043D\u0456\u0447\u043D\u0435 \xAB\u043D\u0430\u043D\u0456\u0441 \u0456 \u0432\u0456\u0434\u0456\u0440\u0432\u0430\u0432 \u043F\u0430\u0441\u0442\u0443\xBB. \u0426\u0435 \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0438\u0439 \u043F\u0456\u0434\u0445\u0456\u0434 \u0456 \u0447\u0456\u0442\u043A\u0456 \u043A\u0440\u043E\u043A\u0438, \u044F\u043A\u0456 \u0437\u0430\u043B\u0435\u0436\u0430\u0442\u044C \u0432\u0456\u0434 \u0441\u0442\u0430\u043D\u0443 \u0432\u0430\u0448\u043E\u0457 \u0448\u043A\u0456\u0440\u0438 \u0441\u0430\u043C\u0435 \u0441\u044C\u043E\u0433\u043E\u0434\u043D\u0456.",
      faceGuideIntro3: "\u041A\u043E\u0436\u043D\u0430 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u2014 \u0446\u0435 \u0449\u0435 \u0439 \u043F\u043E\u0432\u043D\u043E\u0446\u0456\u043D\u043D\u0438\u0439 \u043F\u0440\u0435\u043C\u0456\u0443\u043C-\u0434\u043E\u0433\u043B\u044F\u0434. \u041C\u0438 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u043C\u043E \u043B\u044E\u043A\u0441\u043E\u0432\u0443 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0443 \u043A\u043E\u0441\u043C\u0435\u0442\u0438\u043A\u0443, \u0437\u0430\u0441\u043F\u043E\u043A\u0456\u0439\u043B\u0438\u0432\u0456 \u043C\u0430\u0441\u043A\u0438 \u0442\u0430 \u043A\u0440\u0435\u043C\u0438, \u043F\u0456\u0434\u0456\u0431\u0440\u0430\u043D\u0456 \u043F\u0456\u0434 \u0432\u0430\u0448\u0456 \u043F\u043E\u0442\u0440\u0435\u0431\u0438. \u0421\u0430\u043C\u0435 \u0442\u043E\u043C\u0443 \u043C\u043E\u0457 \u0441\u0435\u0430\u043D\u0441\u0438 \u0442\u0440\u0438\u0432\u0430\u044E\u0442\u044C \u0442\u0440\u043E\u0445\u0438 \u0434\u043E\u0432\u0448\u0435, \u043D\u0456\u0436 \u0443 \u0437\u0432\u0438\u0447\u0430\u0439\u043D\u0438\u0445 \u0441\u0430\u043B\u043E\u043D\u0430\u0445. \u0426\u044F \u043F\u043E\u0441\u043B\u0443\u0433\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u0430 \u0434\u043B\u044F \u0442\u0438\u0445, \u0445\u0442\u043E \u0446\u0456\u043D\u0443\u0454 \u0442\u0443\u0440\u0431\u043E\u0442\u0443 \u0456 \u043E\u0431\u0438\u0440\u0430\u0454 \u0434\u043B\u044F \u0441\u0432\u043E\u0454\u0457 \u0448\u043A\u0456\u0440\u0438 \u043B\u0438\u0448\u0435 \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0435.",
      faceGuideSection1Heading: "\u2728 \u041C\u0430\u0433\u0456\u044F \u0446\u0443\u043A\u0440\u043E\u0432\u043E\u0457 \u043F\u0430\u0441\u0442\u0438: \u0431\u0456\u043B\u044C\u0448\u0435, \u043D\u0456\u0436 \u043F\u0440\u043E\u0441\u0442\u043E \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F",
      faceGuideSection1Para1: "\u0426\u0443\u043A\u0440\u043E\u0432\u0430 \u043F\u0430\u0441\u0442\u0430 \u2014 \u0446\u0435 \u0443\u043D\u0456\u043A\u0430\u043B\u044C\u043D\u0438\u0439 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B, \u044F\u043A\u0438\u0439 \u043F\u0440\u0430\u0446\u044E\u0454 \u0437 \u043E\u0431\u043B\u0438\u0447\u0447\u044F\u043C \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0435\u0439\u043C\u043E\u0432\u0456\u0440\u043D\u043E. \u0412\u043E\u043D\u0430 \u0433\u043B\u0438\u0431\u043E\u043A\u043E \u043E\u0447\u0438\u0449\u0430\u0454 \u0448\u043A\u0456\u0440\u0443 \u0442\u0430 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u043E \u0437\u0432\u0456\u043B\u044C\u043D\u044F\u0454 \u043F\u043E\u0440\u0438 \u0432\u0456\u0434 \u0447\u043E\u0440\u043D\u0438\u0445 \u0446\u044F\u0442\u043E\u043A \u0442\u0430\u043A, \u044F\u043A \u043D\u0435 \u0432\u043F\u043E\u0440\u0430\u0454\u0442\u044C\u0441\u044F \u0436\u043E\u0434\u0435\u043D \u0456\u043D\u0448\u0438\u0439 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B. \u0421\u0430\u043C\u0435 \u0442\u043E\u043C\u0443 \u043C\u043E\u0457\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432 \u043C\u043E\u0436\u043D\u0430 \u0440\u043E\u0437\u0434\u0456\u043B\u0438\u0442\u0438 \u043D\u0430 \u0434\u0432\u0456 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457:",
      faceGuideSection1Bullet1: "\u0422\u0456, \u0445\u0442\u043E \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442\u044C \u0437\u0430 \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E\u044E \u0433\u043B\u0430\u0434\u043A\u0456\u0441\u0442\u044E \u0442\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F\u043C \u043D\u0435\u0431\u0430\u0436\u0430\u043D\u043E\u0433\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F.",
      faceGuideSection1Bullet2: "\u0422\u0456, \u0445\u0442\u043E \u043E\u0431\u0438\u0440\u0430\u0454 \u0446\u044E \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443 \u044F\u043A \u0433\u043B\u0438\u0431\u043E\u043A\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u043E\u0431\u043B\u0438\u0447\u0447\u044F, \u0449\u043E\u0431 \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438 \u0448\u043A\u0456\u0440\u0456 \u0441\u0432\u0456\u0436\u0456\u0441\u0442\u044C, \u043C\u043E\u043B\u043E\u0434\u0456\u0441\u0442\u044C \u0442\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439 \u0432\u0438\u0433\u043B\u044F\u0434.",
      faceGuideSection1Para2: "\u041F\u0440\u043E\u0442\u0435, \u044F\u043A\u0438\u0439 \u0431\u0438 \u0432\u0430\u0440\u0456\u0430\u043D\u0442 \u0432\u0438 \u043D\u0435 \u043E\u0431\u0440\u0430\u043B\u0438, \u0432\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u043E\u0432\u0430\u043D\u043E \u043E\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u0435 \u043F\u043E\u0454\u0434\u043D\u0430\u043D\u043D\u044F \u043E\u0431\u043E\u0445 \u0435\u0444\u0435\u043A\u0442\u0456\u0432! \u0426\u0435 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u0438\u0439 \u0444\u0430\u0432\u043E\u0440\u0438\u0442 \u043C\u043E\u0457\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432. \u041F\u0456\u0441\u043B\u044F \u0442\u0430\u043A\u043E\u0457 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0437'\u044F\u0432\u043B\u044F\u0454\u0442\u044C\u0441\u044F \u0432\u0435\u043B\u0438\u0447\u0435\u0437\u043D\u0435 \u0431\u0430\u0436\u0430\u043D\u043D\u044F \u0434\u043E\u0433\u043B\u044F\u0434\u0430\u0442\u0438 \u0437\u0430 \u0441\u043E\u0431\u043E\u044E, \u0430 \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u0439 \u0434\u043E\u043C\u0430\u0448\u043D\u0456\u0439 \u0434\u043E\u0433\u043B\u044F\u0434 (\u043A\u0440\u0435\u043C\u0438, \u0441\u0438\u0440\u043E\u0432\u0430\u0442\u043A\u0438) \u043F\u043E\u0447\u0438\u043D\u0430\u0454 \u043F\u0440\u0430\u0446\u044E\u0432\u0430\u0442\u0438 \u0432 \u0440\u0430\u0437\u0438 \u0435\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u0456\u0448\u0435, \u0430\u0434\u0436\u0435 \u043E\u0447\u0438\u0449\u0435\u043D\u0430 \u0448\u043A\u0456\u0440\u0430 \u0437\u0434\u0430\u0442\u043D\u0430 \u0432\u0432\u0456\u0431\u0440\u0430\u0442\u0438 \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u043A\u043E\u0440\u0438\u0441\u0442\u0456.",
      faceGuideSection1Quote: '\xAB\u042F \u043E\u0431\u043E\u0436\u043D\u044E\u044E \u0446\u0456 \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F \u0456 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u0440\u043E\u0431\u043B\u044E \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u0441\u043E\u0431\u0456. \u0429\u043E\u0440\u0430\u0437\u0443 \u0446\u0435 \u0441\u043F\u0440\u0430\u0432\u0436\u043D\u0456\u0439 \u0432\u0430\u0443-\u0435\u0444\u0435\u043A\u0442! \u042F \u0434\u0438\u0432\u043B\u044E\u0441\u044F \u0432 \u0434\u0437\u0435\u0440\u043A\u0430\u043B\u043E \u0456 \u0434\u0443\u043C\u0430\u044E: "\u041D\u0435\u0432\u0436\u0435 \u0446\u0435 \u043C\u043E\u044F \u0448\u043A\u0456\u0440\u0430? \u0412\u043E\u043D\u0430 \u0442\u0430\u043A\u0430 \u043D\u0456\u0436\u043D\u0430, \u043D\u0430\u0447\u0435 \u0443 \u043C\u043E\u0454\u0457 \u0434\u043E\u043D\u0435\u0447\u043A\u0438". \u0412\u0438 \u0442\u043E\u0447\u043D\u043E \u043A\u0430\u0439\u0444\u0443\u0432\u0430\u0442\u0438\u043C\u0435\u0442\u0435 \u0432\u0456\u0434 \u0441\u0432\u043E\u0433\u043E \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0430 \u043D\u0430\u0441\u043E\u043B\u043E\u0434\u0436\u0443\u0432\u0430\u0442\u0438\u043C\u0435\u0442\u0435\u0441\u044F \u043A\u043E\u0436\u043D\u0438\u043C \u0434\u043E\u0442\u0438\u043A\u043E\u043C!\xBB',
      faceGuideSection2Heading: "\u{1F4A1} \u0429\u043E \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0437\u043D\u0430\u0442\u0438, \u0437\u0430\u043F\u0438\u0441\u0443\u044E\u0447\u0438\u0441\u044C \u043D\u0430 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044E \u043E\u0431\u043B\u0438\u0447\u0447\u044F",
      faceGuideItem1Strong: "\u041F\u043B\u0430\u043D\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0435\u0440\u0448\u043E\u0433\u043E \u0432\u0456\u0437\u0438\u0442\u0443:",
      faceGuideItem1Text: "\u042F\u043A\u0449\u043E \u0432\u0438 \u0432\u043F\u0435\u0440\u0448\u0435 \u0437\u0430\u043F\u0438\u0441\u0443\u0454\u0442\u0435\u0441\u044F \u043D\u0430 \u043F\u043E\u0432\u043D\u0435 \u043E\u0431\u043B\u0438\u0447\u0447\u044F, \u043F\u043B\u0430\u043D\u0443\u0439\u0442\u0435 \u0432\u0456\u0437\u0438\u0442 \u0437\u0430 5\u20137 \u0434\u043D\u0456\u0432 \u0434\u043E \u0432\u0430\u0436\u043B\u0438\u0432\u043E\u0457 \u043F\u043E\u0434\u0456\u0457. \u042F\u043A\u0449\u043E \u0432\u0438 \u0432\u0436\u0435 \u0440\u043E\u0431\u0438\u043B\u0438 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044E \u0440\u0430\u043D\u0456\u0448\u0435 \u0439 \u0437\u043D\u0430\u0454\u0442\u0435 \u0440\u0435\u0430\u043A\u0446\u0456\u044E \u0441\u0432\u043E\u0454\u0457 \u0448\u043A\u0456\u0440\u0438, \u0434\u043E\u0441\u0442\u0430\u0442\u043D\u044C\u043E 2\u20133 \u0434\u043D\u0456\u0432.",
      faceGuideItem2Strong: "\u0420\u043E\u0437\u0443\u043C\u0456\u043D\u043D\u044F \u0440\u0435\u0430\u043A\u0446\u0456\u0457 \u0448\u043A\u0456\u0440\u0438:",
      faceGuideItem2Text: "\u0414\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F \u0446\u0443\u043A\u0440\u043E\u0432\u043E\u044E \u043F\u0430\u0441\u0442\u043E\u044E \u2014 \u0446\u0435 \u0432\u043E\u0434\u043D\u043E\u0447\u0430\u0441 \u0456 \u043B\u0435\u0433\u043A\u0438\u0439 \u043F\u0456\u043B\u0456\u043D\u0433, \u0442\u043E\u043C\u0443 \u043F\u043E\u0447\u0435\u0440\u0432\u043E\u043D\u0456\u043D\u043D\u044F \u0454 \u043D\u043E\u0440\u043C\u043E\u044E. \u041C\u043E\u044F \u0430\u0432\u0442\u043E\u0440\u0441\u044C\u043A\u0430 \u0442\u0435\u0445\u043D\u0456\u043A\u0430 \u043F\u0435\u0440\u0435\u0434\u0431\u0430\u0447\u0430\u0454 \u043C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0443 \u0442\u0440\u0430\u0432\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0456\u044E, \u043F\u0440\u043E\u0442\u0435 \u0448\u043A\u0456\u0440\u0430 \u0443 \u0432\u0441\u0456\u0445 \u0440\u0456\u0437\u043D\u0430, \u0456 \u0432 \u043F\u0435\u0440\u0448\u0438\u0439 \u0440\u0430\u0437 \u043E\u0440\u0433\u0430\u043D\u0456\u0437\u043C \u043C\u043E\u0436\u0435 \u0437\u0440\u0435\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u043E\u044F\u0432\u043E\u044E \u0434\u0440\u0456\u0431\u043D\u0438\u0445 \u0431\u0456\u043B\u0438\u0445 \u043F\u0440\u0438\u0449\u0438\u043A\u0456\u0432. \u0426\u0435 \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u043E, \u0432\u043E\u043D\u0438 \u043F\u0440\u043E\u0445\u043E\u0434\u044F\u0442\u044C \u0441\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u043E, \u0456 \u044F \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u043F\u0456\u0434\u043A\u0430\u0436\u0443, \u044F\u043A \u043F\u0440\u0438\u0441\u043A\u043E\u0440\u0438\u0442\u0438 \u0446\u0435\u0439 \u043F\u0440\u043E\u0446\u0435\u0441.",
      faceGuideItem3Strong: "\u0421\u0438\u043B\u0430 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u0456:",
      faceGuideItem3Text: "\u041F\u0440\u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0438\u0445 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430\u0445 \u0448\u043A\u0456\u0440\u0430 \u0437\u0432\u0438\u043A\u0430\u0454. \u041D\u0430\u0432\u0456\u0442\u044C \u044F\u043A\u0449\u043E \u043F\u0435\u0440\u0448\u043E\u0433\u043E \u0440\u0430\u0437\u0443 \u0431\u0443\u043B\u0438 \u0434\u0440\u0456\u0431\u043D\u0456 \u0432\u0438\u0441\u0438\u043F\u0430\u043D\u043D\u044F, \u043D\u0430 \u0434\u0440\u0443\u0433\u0438\u0439 \u0440\u0430\u0437 \u0457\u0445 \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439 \u0443\u0436\u0435 \u043D\u0435\u043C\u0430\u0454 \u0430\u0431\u043E \u0437'\u044F\u0432\u043B\u044F\u0454\u0442\u044C\u0441\u044F \u0437\u043D\u0430\u0447\u043D\u043E \u043C\u0435\u043D\u0448\u0435.",
      faceGuideItem4Strong: "\u0421\u0445\u0438\u043B\u044C\u043D\u0456\u0441\u0442\u044C \u0434\u043E \u0432\u0438\u0441\u0438\u043F\u0430\u043D\u044C? \u0412\u0430\u0448\u0430 \u0431\u0435\u0437\u043F\u0435\u043A\u0430 \u2014 \u043F\u043E\u043D\u0430\u0434 \u0443\u0441\u0435:",
      faceGuideItem4Text: "\u0404 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432, \u0443 \u044F\u043A\u0438\u0445 \u043F\u0456\u0441\u043B\u044F \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457 \u043D\u0430\u0432\u0456\u0442\u044C \u043D\u0430\u0439\u043C\u0435\u043D\u0448\u043E\u0457 \u0437\u043E\u043D\u0438 \u0437\u0430\u0432\u0436\u0434\u0438 \u0437'\u044F\u0432\u043B\u044F\u0454\u0442\u044C\u0441\u044F \u043A\u0456\u043B\u044C\u043A\u0430 \u0446\u044F\u0442\u043E\u043A, \u043D\u0435\u0437\u0430\u043B\u0435\u0436\u043D\u043E \u0432\u0456\u0434 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0443 \u2014 \u0431\u0443\u0434\u0435 \u0446\u0435 \u0432\u0456\u0441\u043A \u0447\u0438 \u0446\u0443\u043A\u043E\u0440. \u0422\u0430\u043A \u0440\u0435\u0430\u0433\u0443\u0454 \u0448\u043A\u0456\u0440\u0430 \u0447\u0435\u0440\u0435\u0437 \u0441\u0432\u043E\u0457 \u0432\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u0456 \u043F\u0440\u043E\u0446\u0435\u0441\u0438. \u041F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0456 \u0434\u043E\u0433\u043B\u044F\u0434\u043E\u0432\u0456 \u0437\u0430\u0441\u043E\u0431\u0438 \u043C\u0456\u043D\u0456\u043C\u0456\u0437\u0443\u044E\u0442\u044C \u0446\u0435\u0439 \u043F\u0440\u043E\u044F\u0432, \u043F\u0440\u043E\u0442\u0435 \u0442\u0430\u043A\u0456 \u043A\u043B\u0456\u0454\u043D\u0442\u0438 \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439 \u0434\u043E\u0431\u0440\u0435 \u0437\u043D\u0430\u044E\u0442\u044C \u0441\u0432\u043E\u044E \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u0456\u0441\u0442\u044C, \u0437\u043D\u0430\u044E\u0442\u044C, \u0449\u043E \u0442\u0430\u043A\u0430 \u0440\u0435\u0430\u043A\u0446\u0456\u044F \u0431\u0443\u0434\u0435, \u0456 \u0441\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u043E \u043E\u0431\u0438\u0440\u0430\u044E\u0442\u044C, \u0449\u043E \u0434\u043B\u044F \u043D\u0438\u0445 \u0443 \u043F\u0440\u0456\u043E\u0440\u0438\u0442\u0435\u0442\u0456 \u0437\u0430\u0440\u0430\u0437: \u0433\u043B\u0430\u0434\u0435\u043D\u044C\u043A\u0430 \u0448\u043A\u0456\u0440\u0430 \u0447\u0438 \u0433\u043E\u0442\u043E\u0432\u043D\u0456\u0441\u0442\u044C \u043F\u0435\u0440\u0435\u0447\u0435\u043A\u0430\u0442\u0438 1\u20132 \u0434\u043D\u0456 \u0437 \u043D\u0435\u0437\u043D\u0430\u0447\u043D\u0438\u043C \u0432\u0438\u0441\u0438\u043F\u0430\u043D\u043D\u044F\u043C.\n\n\u0417\u0432\u0435\u0440\u043D\u0456\u0442\u044C \u0443\u0432\u0430\u0433\u0443: \u044F \u043D\u0435 \u043F\u0440\u0430\u0446\u044E\u044E \u0437 \u043E\u0431\u043B\u0438\u0447\u0447\u044F\u043C \u0443 \u0441\u0442\u0430\u0434\u0456\u0457 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0430\u043A\u043D\u0435 \u0430\u0431\u043E \u0432\u0438\u0440\u0430\u0436\u0435\u043D\u043E\u0433\u043E \u043F\u043E\u0441\u0442\u0430\u043A\u043D\u0435. \u042F\u043A\u0449\u043E \u0432\u0430\u0448\u0430 \u0448\u043A\u0456\u0440\u0430 \u0441\u0445\u0438\u043B\u044C\u043D\u0430 \u0434\u043E \u0432\u0438\u0441\u0438\u043F\u0430\u043D\u044C, \u043C\u0438 \u043C\u043E\u0436\u0435\u043C\u043E \u043F\u0440\u043E\u0432\u0435\u0441\u0442\u0438 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443 \u0442\u043E\u0447\u043A\u043E\u0432\u043E \u2014 \u043B\u0438\u0448\u0435 \u0442\u0430\u043C, \u0434\u0435 \u0446\u0435 \u043D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0456 \u0434\u0435 \u043D\u0435\u043C\u0430\u0454 \u0437\u0430\u043F\u0430\u043B\u0435\u043D\u044C \u0443 \u0434\u0435\u043D\u044C \u0432\u0456\u0437\u0438\u0442\u0443 (\u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u0442\u0456\u043B\u044C\u043A\u0438 \u0431\u0440\u043E\u0432\u0438, \u0432\u0435\u0440\u0445\u043D\u044F \u0433\u0443\u0431\u0430 \u0447\u0438 \u043F\u0456\u0434\u0431\u043E\u0440\u0456\u0434\u0434\u044F). \u0426\u0435 \u0432\u0430\u0448\u0430 \u0431\u0435\u0437\u043F\u0435\u043A\u0430, \u0442\u043E\u043C\u0443 \u0431\u0435\u0437\u043F\u043E\u0441\u0435\u0440\u0435\u0434\u043D\u044C\u043E \u0432 \u0437\u043E\u043D\u0456 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457 \u043D\u0435 \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u0430\u043A\u0442\u0438\u0432\u043D\u0438\u0445 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432. \u042F\u043A\u0449\u043E \u0436 \u0437'\u044F\u0432\u0438\u0432\u0441\u044F \u043E\u0434\u0438\u043D \u043F\u043E\u043E\u0434\u0438\u043D\u043E\u043A\u0438\u0439 \u043F\u0440\u0438\u0449\u0438\u043A (\u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u043F\u0435\u0440\u0435\u0434 \u043A\u0440\u0438\u0442\u0438\u0447\u043D\u0438\u043C\u0438 \u0434\u043D\u044F\u043C\u0438), \u044F \u043F\u0440\u043E\u0441\u0442\u043E \u0430\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u043E\u0431\u0456\u0439\u0434\u0443 \u0439\u043E\u0433\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u043E\u044E.",
      faceGuideItem5Strong: "\u041F\u043E\u0447\u043D\u0456\u0442\u044C \u0456\u0437 \u043C\u0430\u043B\u043E\u0433\u043E:",
      faceGuideItem5Text: "\u042F\u043A\u0449\u043E \u0432\u0438 \u0440\u043E\u0431\u0438\u0442\u0435 \u0446\u0435 \u0432\u043F\u0435\u0440\u0448\u0435 \u0456 \u0445\u0432\u0438\u043B\u044E\u0454\u0442\u0435\u0441\u044F, \u0441\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0447\u0430\u0442\u0438 \u0437 \u043C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u043E\u0457 \u0437\u043E\u043D\u0438. \u0412\u0438 \u0437\u043C\u043E\u0436\u0435\u0442\u0435 \u043E\u0446\u0456\u043D\u0438\u0442\u0438, \u044F\u043A \u0437\u043C\u0456\u043D\u0438\u043B\u0430\u0441\u044F \u0448\u043A\u0456\u0440\u0430, \u043F\u043E\u0441\u043F\u043E\u0441\u0442\u0435\u0440\u0456\u0433\u0430\u0442\u0438 \u0437\u0430 \u0440\u0435\u0430\u043A\u0446\u0456\u0454\u044E \u0442\u0456\u043B\u0430, \u0430 \u0432\u0436\u0435 \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u0443 \u043C\u0438 \u0437\u043C\u043E\u0436\u0435\u043C\u043E \u0434\u043E\u0434\u0430\u0442\u0438 \u0431\u0456\u043B\u044C\u0448\u0435 \u0437\u043E\u043D.",
      faceGuideSendPhotoNote: "\u041E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u043D\u0430\u043F\u0438\u0448\u0456\u0442\u044C \u043C\u0435\u043D\u0456 \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0438\u0441\u043E\u043C \u0442\u0430 \u043D\u0430\u0434\u0456\u0448\u043B\u0456\u0442\u044C \u0444\u043E\u0442\u043E \u0441\u0432\u043E\u0454\u0457 \u0448\u043A\u0456\u0440\u0438 \u2014 \u044F \u0437\u0430\u0432\u0436\u0434\u0438 \u043F\u0456\u0434\u043A\u0430\u0436\u0443 \u0442\u0430 \u043F\u0440\u043E\u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0443\u044E. \u042F \u0434\u0456\u043B\u044E\u0441\u044F \u0446\u0438\u043C \u043D\u0435 \u0434\u043B\u044F \u0442\u043E\u0433\u043E, \u0449\u043E\u0431 \u0432\u0430\u0441 \u043D\u0430\u043B\u044F\u043A\u0430\u0442\u0438, \u0430 \u0449\u043E\u0431 \u0432\u0438 \u043F\u043E\u0447\u0443\u0432\u0430\u043B\u0438\u0441\u044F \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E, \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u043E \u0442\u0430 \u0440\u043E\u0437\u0443\u043C\u0456\u043B\u0438 \u043A\u043E\u0436\u0435\u043D \u0435\u0442\u0430\u043F.",
      faceGuideSection3Heading: "\u2728 \u0414\u043E\u0433\u043B\u044F\u0434 \u043F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0442\u0430 \u0447\u043E\u0433\u043E \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u0442\u0438",
      faceGuideSection3Intro: "\u041E\u0431\u043B\u0438\u0447\u0447\u044F \u2014 \u0446\u0435 \u0434\u0443\u0436\u0435 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0430 \u0437\u043E\u043D\u0430, \u0442\u043E\u043C\u0443 \u0442\u0438\u043C\u0447\u0430\u0441\u043E\u0432\u0430 \u0440\u0435\u0430\u043A\u0446\u0456\u044F \u0448\u043A\u0456\u0440\u0438 \u0454 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u043E\u044E. \u041A\u043E\u0436\u0435\u043D \u0456\u0437 \u043D\u0430\u0441 \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0438\u0439: \u0443 \u043A\u043E\u0433\u043E\u0441\u044C \u043F\u0456\u0441\u043B\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0438\u0445 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440 \u0448\u043A\u0456\u0440\u0430 \u0437\u0430\u0441\u043F\u043E\u043A\u043E\u044E\u0454\u0442\u044C\u0441\u044F \u0432\u0436\u0435 \u0437\u0430 20\u201330 \u0445\u0432\u0438\u043B\u0438\u043D, \u0430 \u043A\u043E\u043C\u0443\u0441\u044C \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E 1,5\u20132 \u0434\u043E\u0431\u0438. \u0429\u043E\u0431 \u0434\u043E\u043F\u043E\u043C\u043E\u0433\u0442\u0438 \u0448\u043A\u0456\u0440\u0456 \u0448\u0432\u0438\u0434\u043A\u043E \u0432\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438\u0441\u044F \u0442\u0430 \u0437\u0432\u0435\u0441\u0442\u0438 \u0440\u0438\u0437\u0438\u043A \u043F\u043E\u0434\u0440\u0430\u0437\u043D\u0435\u043D\u044C \u0434\u043E \u043C\u0456\u043D\u0456\u043C\u0443\u043C\u0443, \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0434\u043E\u0442\u0440\u0438\u043C\u0443\u0439\u0442\u0435\u0441\u044F \u043A\u0456\u043B\u044C\u043A\u043E\u0445 \u043F\u0440\u043E\u0441\u0442\u0438\u0445 \u043F\u0440\u0430\u0432\u0438\u043B \u043E\u043F\u0456\u0441\u043B\u044F:",
      faceGuideAftercare1Strong: "\u0417\u0430\u0445\u0438\u0441\u0442 \u0432\u0456\u0434 \u0441\u043E\u043D\u0446\u044F:",
      faceGuideAftercare1Text: "\u041F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u0437\u0430\u0445\u0438\u0449\u0430\u0439\u0442\u0435 \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u043A\u0440\u0435\u043C\u043E\u043C \u0456\u0437 SPF \u043D\u0430 \u0432\u0443\u043B\u0438\u0446\u0456, \u043D\u0435\u0437\u0430\u043B\u0435\u0436\u043D\u043E \u0432\u0456\u0434 \u0442\u043E\u0433\u043E, \u0441\u043E\u043D\u044F\u0447\u043D\u0430 \u043F\u043E\u0433\u043E\u0434\u0430 \u0447\u0438 \u0445\u043C\u0430\u0440\u043D\u0430.",
      faceGuideAftercare2Strong: "\u0412\u0456\u043B\u044C\u043D\u0438\u0439 \u0447\u0430\u0441 \u0434\u043B\u044F \u0441\u0435\u0431\u0435:",
      faceGuideAftercare2Text: "\u0417\u0430 \u043C\u043E\u0436\u043B\u0438\u0432\u043E\u0441\u0442\u0456 \u043F\u0440\u043E\u0432\u0435\u0434\u0456\u0442\u044C \u0446\u0435\u0439 \u0434\u0435\u043D\u044C \u0441\u043F\u043E\u043A\u0456\u0439\u043D\u043E, \u0431\u0435\u0437 \u043F\u043E\u0441\u043F\u0456\u0445\u0443 \u0442\u0430 \u0432\u0438\u0440\u0456\u0448\u0435\u043D\u043D\u044F \u0434\u0435\u0441\u044F\u0442\u043A\u0430 \u0430\u043A\u0442\u0438\u0432\u043D\u0438\u0445 \u0441\u043F\u0440\u0430\u0432. \u0414\u0430\u0439\u0442\u0435 \u0448\u043A\u0456\u0440\u0456 \u0434\u0435\u043D\u044C-\u0434\u0432\u0430 \u0432\u0456\u0434\u043D\u043E\u0441\u043D\u043E\u0433\u043E \u0441\u043F\u043E\u043A\u043E\u044E \u0434\u043B\u044F \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F.",
      faceGuideAftercare3Strong: "\u0427\u0438\u0441\u0442\u043E\u0442\u0430 \u0440\u0443\u043A \u0442\u0430 \u0433\u0430\u0434\u0436\u0435\u0442\u0456\u0432:",
      faceGuideAftercare3Text: "\u041D\u0430\u043C\u0430\u0433\u0430\u0439\u0442\u0435\u0441\u044F \u043D\u0435 \u0442\u043E\u0440\u043A\u0430\u0442\u0438\u0441\u044F \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u0431\u0440\u0443\u0434\u043D\u0438\u043C\u0438 \u0440\u0443\u043A\u0430\u043C\u0438 \u0447\u0438 \u0435\u043A\u0440\u0430\u043D\u043E\u043C \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443.",
      faceGuideAftercare4Strong: "\u0423\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0432\u0456\u0434 \u0442\u0435\u0440\u0442\u044F \u0442\u0430 \u043F\u043E\u0434\u0440\u0430\u0437\u043D\u0435\u043D\u044C:",
      faceGuideAftercare4Text: "\u0423\u043D\u0438\u043A\u0430\u0439\u0442\u0435 \u0431\u043B\u0438\u0437\u044C\u043A\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0443 \u0437 \u0447\u043E\u043B\u043E\u0432\u0456\u0447\u043E\u044E \u0431\u043E\u0440\u043E\u0434\u043E\u044E \u0447\u0438 \u0449\u0435\u0442\u0438\u043D\u043E\u044E, \u0449\u043E\u0431 \u0434\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u043E \u043D\u0435 \u0442\u0440\u0430\u0432\u043C\u0443\u0432\u0430\u0442\u0438 \u043D\u0456\u0436\u043D\u0443 \u0448\u043A\u0456\u0440\u0443.",
      faceGuideAftercare5Strong: "\u0421\u0432\u0456\u0436\u0430 \u043D\u0430\u0432\u043E\u043B\u043E\u0447\u043A\u0430:",
      faceGuideAftercare5Text: "\u041E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u0437\u043C\u0456\u043D\u0456\u0442\u044C \u043D\u0430\u0432\u043E\u043B\u043E\u0447\u043A\u0443 \u043D\u0430 \u043F\u043E\u0434\u0443\u0448\u0446\u0456 \u043F\u0435\u0440\u0435\u0434 \u0441\u043D\u043E\u043C. \u0411\u0440\u0443\u0434\u043D\u0430 \u0442\u043A\u0430\u043D\u0438\u043D\u0430 \u2014 \u0446\u0435 \u043D\u0430\u0439\u0447\u0430\u0441\u0442\u0456\u0448\u0430 \u043F\u0440\u0438\u0447\u0438\u043D\u0430 \u043F\u043E\u044F\u0432\u0438 \u0434\u0440\u0456\u0431\u043D\u0438\u0445 \u0432\u0438\u0441\u0438\u043F\u0430\u043D\u044C \u043B\u0438\u0448\u0435 \u0437 \u043E\u0434\u043D\u043E\u0433\u043E \u0431\u043E\u043A\u0443 \u043E\u0431\u043B\u0438\u0447\u0447\u044F.",
      faceGuideAftercare6Strong: "\u0412\u0456\u0434\u043F\u043E\u0447\u0438\u043D\u043E\u043A \u0432\u0456\u0434 \u043A\u043E\u0441\u043C\u0435\u0442\u0438\u043A\u0438:",
      faceGuideAftercare6Text: "\u041D\u0435 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0439\u0442\u0435 \u0434\u0435\u043A\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0443 \u043A\u043E\u0441\u043C\u0435\u0442\u0438\u043A\u0443, \u043F\u043E\u043A\u0438 \u0448\u043A\u0456\u0440\u0430 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u043D\u0435 \u0437\u0430\u0441\u043F\u043E\u043A\u043E\u0457\u0442\u044C\u0441\u044F.",
      faceGuideClosingNote: "\u041F\u0430\u043C'\u044F\u0442\u0430\u0439\u0442\u0435: \u044F\u043A\u0449\u043E \u0440\u0430\u043F\u0442\u043E\u043C \u0437'\u044F\u0432\u0438\u043B\u043E\u0441\u044F \u043D\u0435\u0437\u043D\u0430\u0447\u043D\u0435 \u0432\u0438\u0441\u0438\u043F\u0430\u043D\u043D\u044F \u2014 \u0446\u0435 \u043D\u0435 \u0441\u0442\u0440\u0430\u0448\u043D\u043E. \u042F \u0437\u0430\u0432\u0436\u0434\u0438 \u043D\u0430 \u0437\u0432'\u044F\u0437\u043A\u0443 \u0442\u0430 \u043F\u0456\u0434\u043A\u0430\u0436\u0443, \u0449\u043E \u0440\u043E\u0431\u0438\u0442\u0438 \u0443 \u0432\u0430\u0448\u043E\u043C\u0443 \u0432\u0438\u043F\u0430\u0434\u043A\u0443.",
      faceGuideClosingCta: "\u042F\u043A\u0449\u043E \u0443 \u0442\u0435\u0431\u0435 \u0437\u0430\u043B\u0438\u0448\u0438\u043B\u0438\u0441\u044F \u0437\u0430\u043F\u0438\u0442\u0430\u043D\u043D\u044F \u0441\u0442\u043E\u0441\u043E\u0432\u043D\u043E \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457 \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u2014 \u043F\u0438\u0448\u0438 \u043C\u0435\u043D\u0456, \u0456 \u044F \u0437 \u0440\u0430\u0434\u0456\u0441\u0442\u044E \u043D\u0430 \u0432\u0441\u0435 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u043C!",
      // Duration notes
      durationToggle: "\u041F\u0440\u043E \u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440",
      durationIntro: "\u0427\u0430\u0441, \u0432\u043A\u0430\u0437\u0430\u043D\u0438\u0439 \u043F\u043E\u0440\u0443\u0447 \u0456\u0437 \u043A\u043E\u0436\u043D\u043E\u044E \u043F\u043E\u0441\u043B\u0443\u0433\u043E\u044E, \u2014 \u0446\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u0430 \u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C. \u0423 \u0432\u0430\u0448\u043E\u043C\u0443 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u043C\u0443 \u0432\u0438\u043F\u0430\u0434\u043A\u0443 \u0432\u0441\u0435 \u043C\u043E\u0436\u0435 \u0437\u0430\u0439\u043D\u044F\u0442\u0438 \u0437\u043D\u0430\u0447\u043D\u043E \u043C\u0435\u043D\u0448\u0435. \u041A\u043E\u0436\u0435\u043D \u043A\u0440\u043E\u043A \u043C\u043E\u0454\u0457 \u0440\u043E\u0431\u043E\u0442\u0438 \u0441\u043F\u0440\u044F\u043C\u043E\u0432\u0430\u043D\u0438\u0439 \u043D\u0430 \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u0443 \u044F\u043A\u0456\u0441\u0442\u044C \u0442\u0430 \u0432\u0430\u0448 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u0438\u0439 \u043A\u043E\u043C\u0444\u043E\u0440\u0442.",
      durationNote1Title: "\u042F\u043A \u044F \u043F\u0440\u0430\u0446\u044E\u044E",
      durationNote1Desc: "\u041C\u043E\u044F \u043C\u0430\u0439\u0441\u0442\u0435\u0440\u043D\u0456\u0441\u0442\u044C \u043F\u043E\u043B\u044F\u0433\u0430\u0454 \u0443 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u0456 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457 \u0437 \u043C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0438\u043C \u0434\u0438\u0441\u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043E\u043C \u0442\u0430 \u043D\u0443\u043B\u044C\u043E\u0432\u043E\u044E \u0442\u0440\u0430\u0432\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0456\u0454\u044E \u0448\u043A\u0456\u0440\u0438 \u2014 \u0443 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u043C\u043E\u0436\u043B\u0438\u0432\u0456\u0439 \u043C\u0456\u0440\u0456 \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0432\u0438\u043F\u0430\u0434\u043A\u0443.",
      durationNote2Title: "\u0406\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0430 \u0442\u0435\u0445\u043D\u0456\u043A\u0430",
      durationNote2Desc: "\u041C\u0456\u0439 \u0434\u043E\u0441\u0432\u0456\u0434 \u0434\u043E\u0437\u0432\u043E\u043B\u044F\u0454 \u043C\u0435\u043D\u0456 \u043F\u0456\u0434\u0456\u0431\u0440\u0430\u0442\u0438 \u043E\u043F\u0442\u0438\u043C\u0430\u043B\u044C\u043D\u0443 \u0433\u0443\u0441\u0442\u043E\u0442\u0443 \u043F\u0430\u0441\u0442\u0438 \u0442\u0430 \u0442\u0435\u0445\u043D\u0456\u043A\u0443 \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0432\u0430\u0441 \u2014 \u043C\u043E\u0457 \u0434\u0456\u0457 \u0437\u0430\u0432\u0436\u0434\u0438 \u0437\u0430\u043B\u0435\u0436\u0430\u0442\u044C \u0432\u0456\u0434 \u0441\u0442\u0430\u043D\u0443 \u0432\u0430\u0448\u043E\u0457 \u0448\u043A\u0456\u0440\u0438 \u043F\u0456\u0434 \u0447\u0430\u0441 \u0432\u0456\u0437\u0438\u0442\u0443.",
      durationNote3Title: "\u0411\u0435\u0437 \u043A\u043E\u043D\u0432\u0435\u0454\u0440\u0430 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432",
      durationNote3Desc: "\u042F \u043D\u0435 \u043F\u0440\u0430\u0446\u044E\u044E \u0443 \u0444\u043E\u0440\u043C\u0430\u0442\u0456 \u043F\u043E\u0442\u043E\u043A\u043E\u0432\u043E\u0433\u043E \u043F\u0440\u0438\u0439\u043E\u043C\u0443. \u041A\u043E\u0436\u043D\u0430 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u0432\u0430\u0448\u0438\u043C \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0438\u043C \u043F\u043E\u0442\u0440\u0435\u0431\u0430\u043C \u0443 \u0441\u043F\u043E\u043A\u0456\u0439\u043D\u0456\u0439, \u0431\u0435\u0437\u0441\u0442\u0440\u0435\u0441\u043E\u0432\u0456\u0439 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0456.",
      durationNote4Title: "\u0406\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0456 \u0444\u0430\u043A\u0442\u043E\u0440\u0438",
      durationNote4Desc: "\u0414\u043E\u0432\u0436\u0438\u043D\u0430, \u0433\u0443\u0441\u0442\u043E\u0442\u0430, \u043E\u0431'\u0454\u043C \u0442\u0430 \u0441\u043A\u043B\u0430\u0434\u043D\u0456\u0441\u0442\u044C \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432\u043F\u043B\u0438\u0432\u0430\u044E\u0442\u044C \u043D\u0430 \u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C. \u041D\u0430 \u043F\u0435\u0440\u0448\u0438\u0439 \u0432\u0456\u0437\u0438\u0442, \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043F\u043B\u0430\u043D\u0443\u0439\u0442\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0432\u043A\u0430\u0437\u0430\u043D\u0438\u0439 \u0447\u0430\u0441.",
      durationNote5Title: "\u0415\u043A\u043E\u043D\u043E\u043C\u0456\u044F \u0447\u0430\u0441\u0443 \u0437 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0430\u043C\u0438",
      durationNote5Desc: "\u041F\u043E\u0454\u0434\u043D\u0430\u043D\u043D\u044F \u043A\u0456\u043B\u044C\u043A\u043E\u0445 \u0437\u043E\u043D \u0432 \u043E\u0434\u043D\u043E\u043C\u0443 \u0441\u0435\u0430\u043D\u0441\u0456 \u0447\u0430\u0441\u0442\u043E \u0431\u0443\u0434\u0435 \u0448\u0432\u0438\u0434\u0448\u0438\u043C, \u043D\u0456\u0436 \u0431\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u043A\u043E\u0436\u043D\u043E\u0457 \u0437\u043E\u043D\u0438 \u043E\u043A\u0440\u0435\u043C\u043E.",
      durationNote6Title: "\u0413\u043D\u0443\u0447\u043A\u0456\u0441\u0442\u044C \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u0440\u043E\u0437\u043A\u043B\u0430\u0434\u0443",
      durationNote6Desc: "\u042F\u043A\u0449\u043E \u0441\u044C\u043E\u0433\u043E\u0434\u043D\u0456 \u0434\u043B\u044F \u0432\u0430\u0441 \u0432\u0430\u0436\u043B\u0438\u0432\u0430 \u0448\u0432\u0438\u0434\u043A\u0456\u0441\u0442\u044C \u2014 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u044C\u0442\u0435 \u043C\u0435\u043D\u0435 \u0437\u0430\u0437\u0434\u0430\u043B\u0435\u0433\u0456\u0434\u044C. \u0412\u0430\u0448\u0430 \u0431\u0435\u0437\u043F\u0435\u043A\u0430 \u0442\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0437\u0430\u0432\u0436\u0434\u0438 \u043D\u0430 \u043F\u0435\u0440\u0448\u043E\u043C\u0443 \u043C\u0456\u0441\u0446\u0456.",
      servicesBottomQuote: "\xAB\u041D\u0435 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u044F\u043A\u0430 \u043F\u043E\u0441\u043B\u0443\u0433\u0430 \u043F\u0456\u0434\u0445\u043E\u0434\u0438\u0442\u044C \u0441\u0430\u043C\u0435 \u0432\u0430\u043C? \u042F \u0437\u0430\u0432\u0436\u0434\u0438 \u0433\u043E\u0442\u043E\u0432\u0430 \u0434\u043E\u043F\u043E\u043C\u043E\u0433\u0442\u0438 \u0437 \u0432\u0438\u0431\u043E\u0440\u043E\u043C.\xBB",
      servicesBottomCta: "\u0417\u0430\u0434\u0430\u0442\u0438 \u043F\u0438\u0442\u0430\u043D\u043D\u044F"
    },
    courses: {
      eyebrow: "\u041D\u0430\u0432\u0447\u0430\u043D\u043D\u044F \u0442\u0430 \u043A\u0443\u0440\u0441\u0438",
      headingLine1: "\u0425\u043E\u0447\u0435\u0442\u0435 \u043D\u0430\u0432\u0447\u0438\u0442\u0438\u0441\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u043E?",
      headingLine2: "\u042F \u043D\u0430\u0432\u0447\u0443 \u0432\u0430\u0441 \u0443\u0441\u044C\u043E\u043C\u0443.",
      subtext: "\u041C\u043E\u0457 \u043A\u0443\u0440\u0441\u0438 \u2014 \u0446\u0435 \u043D\u0430\u0431\u0430\u0433\u0430\u0442\u043E \u0431\u0456\u043B\u044C\u0448\u0435, \u043D\u0456\u0436 \u0441\u0443\u0445\u0430 \u0442\u0435\u043E\u0440\u0456\u044F. \u0426\u0435 \u0446\u0456\u043B\u0456\u0441\u043D\u0430, \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u043E \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u043E\u0432\u0430\u043D\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u0430, \u044F\u043A\u0430 \u0432\u0435\u0434\u0435 \u043C\u043E\u0457\u0445 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0456\u0432 \u043F\u0440\u044F\u043C\u043E \u0434\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443. \u0421\u0430\u043C\u0435 \u0432 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u0456 \u044F \u0440\u043E\u0437\u043A\u0440\u0438\u0432\u0430\u044E\u0441\u044F \u0442\u0430 \u0436\u0438\u0432\u0443 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E.",
      card1Badge: "\u041E\u0444\u043B\u0430\u0439\u043D \xB7 \u0411\u0440\u0456\u0441\u0442\u043E\u043B\u044C",
      card1Title: "\u0414\u043B\u044F \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u0456\u0432",
      card1Desc: "\u0429\u0438\u0440\u0456 \u043A\u0443\u0440\u0441\u0438 \u0434\u043B\u044F \u043F\u043E\u0447\u0430\u0442\u043A\u0456\u0432\u0446\u0456\u0432 \u0442\u0430 \u043F\u0440\u043E\u0441\u0443\u043D\u0443\u0442\u0456 \u043C\u0430\u0439\u0441\u0442\u0435\u0440-\u043A\u043B\u0430\u0441\u0438 \u0434\u043B\u044F \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0443\u044E\u0447\u0438\u0445 \u043C\u0430\u0439\u0441\u0442\u0440\u0456\u0432, \u044F\u043A\u0456 \u043F\u0440\u0430\u0433\u043D\u0443\u0442\u044C \u0432\u0438\u0432\u0435\u0441\u0442\u0438 \u0441\u0432\u043E\u0457 \u043D\u0430\u0432\u0438\u0447\u043A\u0438 \u043D\u0430 \u043F\u0440\u0435\u043C\u0456\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u0456\u0432\u0435\u043D\u044C. \u0406\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0442\u0438\u0445, \u0445\u0442\u043E \u043F\u043E\u0447\u0438\u043D\u0430\u0454 \u0437 \u043D\u0443\u043B\u044F, \u0456 \u0434\u043B\u044F \u0434\u043E\u0441\u0432\u0456\u0434\u0447\u0435\u043D\u0438\u0445 \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u0456\u0432, \u044F\u043A\u0456 \u0445\u043E\u0447\u0443\u0442\u044C \u0434\u043E\u0441\u044F\u0433\u0442\u0438 \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u0433\u043E \u0440\u0456\u0432\u043D\u044F.",
      card1Tag1: "\u041E\u0434\u0438\u043D \u043D\u0430 \u043E\u0434\u0438\u043D",
      card1Tag2: "\u0406\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u0435 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F",
      card2Badge: "\u041E\u0444\u043B\u0430\u0439\u043D \xB7 \u0411\u0440\u0456\u0441\u0442\u043E\u043B\u044C",
      card2Title: "\u0414\u043B\u044F \u0441\u0435\u0431\u0435",
      card2Desc: "\u0417\u0430\u0442\u0438\u0448\u043D\u0435 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F \u0434\u043B\u044F \u0436\u0456\u043D\u043E\u043A, \u044F\u043A\u0456 \u0445\u043E\u0447\u0443\u0442\u044C \u043E\u0441\u0432\u043E\u0457\u0442\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0434\u043B\u044F \u0432\u043B\u0430\u0441\u043D\u043E\u0433\u043E \u0434\u043E\u043C\u0430\u0448\u043D\u044C\u043E\u0433\u043E \u0434\u043E\u0433\u043B\u044F\u0434\u0443. \u041E\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u044F \u043D\u0430\u0432\u0447\u0430\u044E \u0432\u0438\u043A\u043B\u044E\u0447\u043D\u043E \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u043E, \u0432\u0438 \u043E\u0442\u0440\u0438\u043C\u0430\u0454\u0442\u0435 \u043B\u0438\u0448\u0435 \u0442\u0456 \u0434\u0435\u0442\u0430\u043B\u0456 \u0442\u0430 \u0442\u0435\u0445\u043D\u0456\u043A\u0438, \u044F\u043A\u0456 \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u043F\u0456\u0434\u0456\u0439\u0434\u0443\u0442\u044C \u0441\u0430\u043C\u0435 \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u0448\u043A\u0456\u0440\u0438 \u0442\u0430 \u0442\u0438\u043F\u0443 \u0432\u043E\u043B\u043E\u0441\u0441\u044F.",
      card2Tag1: "\u041E\u0434\u0438\u043D \u043D\u0430 \u043E\u0434\u0438\u043D",
      card2Tag2: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0456\u0437\u043E\u0432\u0430\u043D\u0438\u0439 \u043F\u0456\u0434\u0445\u0456\u0434",
      onlineBadge: "\u041E\u043D\u043B\u0430\u0439\u043D-\u0430\u043A\u0430\u0434\u0435\u043C\u0456\u044F",
      onlineHeading: "\u041E\u0441\u043E\u0431\u0438\u0441\u0442\u0438\u0439 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0432\u0434\u043E\u043C\u0430",
      onlineParagraph1: "\u0414\u0432\u0430 \u0440\u043E\u043A\u0438 \u0442\u043E\u043C\u0443 \u044F \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0430 \u0441\u0432\u0456\u0439 \u043F\u0435\u0440\u0448\u0438\u0439 \u043E\u043D\u043B\u0430\u0439\u043D-\u043A\u0443\u0440\u0441: \xAB\u041E\u0441\u043D\u043E\u0432\u0438 \u043E\u0441\u043E\u0431\u0438\u0441\u0442\u043E\u0433\u043E \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443\xBB \u2014 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u0438\u0439 \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0442\u0438\u0445, \u0445\u0442\u043E \u0445\u043E\u0447\u0435 \u043E\u0441\u0432\u043E\u0457\u0442\u0438 \u0432\u0441\u0456 \u043D\u044E\u0430\u043D\u0441\u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u043E\u0433\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0432 \u0434\u043E\u043C\u0430\u0448\u043D\u0456\u0445 \u0443\u043C\u043E\u0432\u0430\u0445.",
      onlineParagraph2: "\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456 \u043F\u043E\u043D\u0430\u0434 19 \u0443\u0441\u043F\u0456\u0448\u043D\u0438\u0445 \u0432\u0438\u043F\u0443\u0441\u043A\u043D\u0438\u043A\u0456\u0432 \u0437 \u0443\u0441\u044C\u043E\u0433\u043E \u0441\u0432\u0456\u0442\u0443 \u043F\u0440\u043E\u0439\u0448\u043B\u0438 \u0446\u0435\u0439 \u043A\u0443\u0440\u0441. \u0426\u0435 \u043D\u0435\u0439\u043C\u043E\u0432\u0456\u0440\u043D\u0430 \u0456\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0456\u044F \u0432 \u0441\u0435\u0431\u0435, \u0456 \u044F \u0432 \u0437\u0430\u0445\u0432\u0430\u0442\u0456 \u0432\u0456\u0434 \u0442\u043E\u0433\u043E, \u0449\u043E \u043C\u043E\u044F \u043C\u0440\u0456\u044F \u043F\u0440\u043E \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u0443 \u043E\u0441\u0432\u0456\u0442\u0443 \u0441\u0442\u0430\u0454 \u0440\u0435\u0430\u043B\u044C\u043D\u0456\u0441\u0442\u044E.",
      stat1Label: "\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u0456\u0432 \u043F\u043E \u0432\u0441\u044C\u043E\u043C\u0443 \u0441\u0432\u0456\u0442\u0443",
      stat2Label: "\u0423\u0441\u043F\u0456\u0448\u043D\u0438\u0445 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0456\u0432",
      videoAlt: "\u041C\u0430\u0440\u0456\u044F \u0412\u0430\u0446\u0435\u0431\u0430 \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u044C \u043A\u0443\u0440\u0441 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443"
    },
    care: {
      eyebrow: "\u0414\u043E\u0433\u043B\u044F\u0434 \u0437\u0430 \u0448\u043A\u0456\u0440\u043E\u044E",
      heading: "\u0413\u0456\u0434 \u0437 \u0434\u043E\u0433\u043B\u044F\u0434\u0443",
      subtext: "\u0429\u043E\u0431 \u0433\u0430\u0440\u0430\u043D\u0442\u0443\u0432\u0430\u0442\u0438 \u0432\u0430\u043C \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0433\u043B\u0430\u0434\u043A\u0443 \u0448\u043A\u0456\u0440\u0443, \u043C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0434\u0438\u0441\u043A\u043E\u043C\u0444\u043E\u0440\u0442 \u0442\u0430 \u0440\u043E\u0437\u043A\u0456\u0448\u043D\u0438\u0439 \u0441\u043F\u0430-\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442, \u0434\u043E\u0442\u0440\u0438\u043C\u0443\u0439\u0442\u0435\u0441\u044C \u0446\u0438\u0445 \u043F\u0440\u043E\u0441\u0442\u0438\u0445 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0439 \u0437 \u043F\u0456\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438 \u0442\u0430 \u0434\u043E\u0433\u043B\u044F\u0434\u0443 \u043F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438.",
      beforeTitle: "\u0414\u043E \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443",
      beforeSubtitle: "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u0456\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438",
      before1Title: "\u0406\u0434\u0435\u0430\u043B\u044C\u043D\u0430 \u0434\u043E\u0432\u0436\u0438\u043D\u0430 \u0432\u043E\u043B\u043E\u0441\u0441\u044F",
      before1Desc: "\u0414\u043B\u044F \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E\u0457 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043F\u0440\u0438\u0431\u043B\u0438\u0437\u043D\u043E 5\u20137 \u043C\u043C (\u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439 \u0446\u0435 2\u20133 \u0442\u0438\u0436\u043D\u0456 \u043F\u0456\u0441\u043B\u044F \u043E\u0441\u0442\u0430\u043D\u043D\u044C\u043E\u0433\u043E \u0433\u043E\u043B\u0456\u043D\u043D\u044F).",
      before2Title: "\u041B\u0435\u0433\u043A\u0438\u0439 \u0441\u043A\u0440\u0430\u0431",
      before2Desc: "\u0417\u0440\u043E\u0431\u0456\u0442\u044C \u043B\u0435\u0433\u043A\u0438\u0439 \u043F\u0456\u043B\u0456\u043D\u0433 \u0437\u043E\u043D\u0438 \u0437\u0430 24 \u0433\u043E\u0434\u0438\u043D\u0438 \u0434\u043E \u0441\u0435\u0430\u043D\u0441\u0443. \u0426\u0435 \u0434\u043E\u043F\u043E\u043C\u043E\u0436\u0435 \u043F\u0456\u0434\u043D\u044F\u0442\u0438 \u043F\u043B\u043E\u0441\u043A\u0435 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0442\u0430 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043E\u0440\u043E\u0433\u043E\u0432\u0456\u043B\u0456 \u043A\u043B\u0456\u0442\u0438\u043D\u0438 \u0434\u043B\u044F \u043A\u0440\u0430\u0449\u043E\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443.",
      before3Title: "\u0427\u0438\u0441\u0442\u0430, \u0441\u0443\u0445\u0430 \u0448\u043A\u0456\u0440\u0430",
      before3Desc: "\u041F\u0440\u0438\u0439\u0434\u0456\u0442\u044C \u0456\u0437 \u0447\u0438\u0441\u0442\u043E\u044E \u0448\u043A\u0456\u0440\u043E\u044E. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043D\u0435 \u043D\u0430\u043D\u043E\u0441\u044C\u0442\u0435 \u0436\u0438\u0440\u043D\u0456 \u043A\u0440\u0435\u043C\u0456, \u043B\u043E\u0441\u044C\u0439\u043E\u043D\u0438 \u0430\u0431\u043E \u043E\u043B\u0456\u0457 \u0443 \u0434\u0435\u043D\u044C \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438, \u043E\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u0432\u043E\u043D\u0438 \u043F\u0435\u0440\u0435\u0448\u043A\u043E\u0434\u0436\u0430\u044E\u0442\u044C \u0437\u0447\u0435\u043F\u043B\u0435\u043D\u043D\u044E \u043F\u0430\u0441\u0442\u0438.",
      before4Title: "\u0423\u043D\u0438\u043A\u0430\u0439\u0442\u0435 \u0437\u0430\u0441\u043C\u0430\u0433\u0438",
      before4Desc: "\u0423\u043D\u0438\u043A\u0430\u0439\u0442\u0435 \u0437\u0430\u0441\u043C\u0430\u0433\u0438 \u043D\u0430 \u0441\u043E\u043D\u0446\u0456, \u0441\u043E\u043B\u044F\u0440\u0456\u044E \u0442\u0430 \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u043D\u044F \u0430\u0432\u0442\u043E\u0437\u0430\u0441\u043C\u0430\u0433\u0438 \u0449\u043E\u043D\u0430\u0439\u043C\u0435\u043D\u0448\u0435 \u0437\u0430 24\u201348 \u0433\u043E\u0434\u0438\u043D \u0434\u043E \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438.",
      afterTitle: "\u041F\u0456\u0441\u043B\u044F \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443",
      afterSubtitle: "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0434\u043E\u0433\u043B\u044F\u0434\u0443",
      after1Title: "\u0414\u0438\u0445\u0430\u044E\u0447\u0438\u0439 \u043E\u0434\u044F\u0433",
      after1Desc: "\u041E\u0434\u044F\u0433\u0430\u0439\u0442\u0435 \u0432\u0456\u043B\u044C\u043D\u0438\u0439, \u043C'\u044F\u043A\u0438\u0439 \u0431\u0430\u0432\u043E\u0432\u043D\u044F\u043D\u0438\u0439 \u043E\u0434\u044F\u0433 \u0442\u0430 \u0431\u0456\u043B\u0438\u0437\u043D\u0443. \u0429\u0456\u043B\u044C\u043D\u0456 \u0441\u0438\u043D\u0442\u0435\u0442\u0438\u0447\u043D\u0456 \u0442\u043A\u0430\u043D\u0438\u043D\u0438 \u0441\u043F\u0440\u0438\u0447\u0438\u043D\u044F\u044E\u0442\u044C \u0442\u0435\u0440\u0442\u044F \u0456 \u043F\u0456\u0442, \u0449\u043E \u043C\u043E\u0436\u0435 \u043F\u0440\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u0434\u043E \u043F\u043E\u0434\u0440\u0430\u0437\u043D\u0435\u043D\u043D\u044F.",
      after2Title: "\u0423\u043D\u0438\u043A\u0430\u0439\u0442\u0435 \u0442\u0435\u043F\u043B\u0430 \u0442\u0430 \u0444\u0456\u0437\u0438\u0447\u043D\u0438\u0445 \u043D\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u044C",
      after2Desc: "\u041F\u0440\u043E\u0442\u044F\u0433\u043E\u043C \u043F\u0435\u0440\u0448\u0438\u0445 24\u201348 \u0433\u043E\u0434\u0438\u043D \u0443\u043D\u0438\u043A\u0430\u0439\u0442\u0435 \u0456\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u0438\u0445 \u0442\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u044C, \u0433\u0430\u0440\u044F\u0447\u0438\u0445 \u0432\u0430\u043D\u043D, \u043F\u0430\u0440\u043E\u0432\u0438\u0445 \u043A\u0456\u043C\u043D\u0430\u0442, \u0441\u0430\u0443\u043D \u0442\u0430 \u0431\u0430\u0441\u0435\u0439\u043D\u0456\u0432.",
      after3Title: "\u0411\u0435\u0437 \u0430\u0433\u0440\u0435\u0441\u0438\u0432\u043D\u0438\u0445 \u0437\u0430\u0441\u043E\u0431\u0456\u0432",
      after3Desc: "\u041D\u0435 \u043D\u0430\u043D\u043E\u0441\u044C\u0442\u0435 \u043F\u0430\u0440\u0444\u0443\u043C\u043E\u0432\u0430\u043D\u0456 \u043B\u043E\u0441\u044C\u0439\u043E\u043D\u0438, \u0434\u0435\u0437\u043E\u0434\u043E\u0440\u0430\u043D\u0442\u0438, \u0430\u0432\u0442\u043E\u0437\u0430\u0441\u043C\u0430\u0433\u0443, \u0434\u0435\u043A\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0443 \u043A\u043E\u0441\u043C\u0435\u0442\u0438\u043A\u0443 \u0430\u0431\u043E \u0445\u0456\u043C\u0456\u0447\u043D\u0456 \u0437\u0430\u0441\u043E\u0431\u0438 \u0434\u043B\u044F \u0448\u043A\u0456\u0440\u0438 \u043D\u0430 \u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u0443 \u0434\u0456\u043B\u044F\u043D\u043A\u0443.",
      after4Title: "\u0417\u0432\u043E\u043B\u043E\u0436\u0435\u043D\u043D\u044F \u0442\u0430 \u0432\u0456\u0434\u043B\u0443\u0449\u0435\u043D\u043D\u044F",
      after4Desc: "\u041F\u043E\u0447\u0438\u043D\u0430\u0439\u0442\u0435 \u0437\u0432\u043E\u043B\u043E\u0436\u0443\u0432\u0430\u0442\u0438 \u0448\u043A\u0456\u0440\u0443 \u0449\u043E\u0434\u043D\u044F \u0447\u0435\u0440\u0435\u0437 24 \u0433\u043E\u0434\u0438\u043D\u0438. \u041F\u043E\u0447\u0438\u043D\u0430\u0439\u0442\u0435 \u043B\u0435\u0433\u043A\u0438\u0439 \u043F\u0456\u043B\u0456\u043D\u0433 \u0447\u0435\u0440\u0435\u0437 3\u20134 \u0434\u043D\u0456 \u043F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u0431\u0456\u0433\u0430\u043D\u043D\u044F \u0432\u0440\u043E\u0441\u043B\u043E\u043C\u0443 \u0432\u043E\u043B\u043E\u0441\u0441\u044E.",
      closingQuote: "\xAB\u0412\u0430\u0448\u0430 \u0448\u043A\u0456\u0440\u0430 \u2014 \u0446\u0435 \u0437\u0430\u0445\u0438\u0441\u0442 \u0432\u0430\u0448\u043E\u0433\u043E \u0442\u0456\u043B\u0430 \u0442\u0430 \u0432\u0430\u0448\u0430 \u0432\u0456\u0437\u0438\u0442\u043D\u0430 \u043A\u0430\u0440\u0442\u043A\u0430. \u0414\u043E\u0433\u043B\u044F\u0434\u0430\u0439\u0442\u0435 \u0437\u0430 \u043D\u0435\u044E \u0437 \u043B\u044E\u0431\u043E\u0432'\u044E \u0442\u0430 \u0442\u0443\u0440\u0431\u043E\u0442\u043E\u044E.\xBB"
    },
    testimonials: {
      eyebrow: "\u0412\u0456\u0434\u0433\u0443\u043A\u0438",
      heading: "\u0422\u0435\u043F\u043B\u0456 \u0441\u043B\u043E\u0432\u0430 \u0432\u0456\u0434 \u043C\u043E\u0457\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u043E\u043A",
      closingQuote: "\xAB\u0422\u0430\u043A\u0456 \u0441\u043B\u043E\u0432\u0430 \u2014 \u0446\u0435 \u0431\u0456\u043B\u044C\u0448\u0435, \u043D\u0456\u0436 \u043F\u0440\u043E\u0441\u0442\u043E \u0432\u0456\u0434\u0433\u0443\u043A. \u0426\u0435 \u0441\u043F\u0440\u0430\u0432\u0436\u043D\u044F \u043D\u0430\u0433\u043E\u0440\u043E\u0434\u0430.\xBB"
    },
    faq: {
      eyebrow: "FAQ",
      heading: "\u0417\u0430\u043F\u0438\u0442\u0430\u043D\u043D\u044F \u0442\u0430 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0456",
      cat1Name: "\u041F\u0456\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0442\u0430 \u0437\u0430\u043F\u0438\u0441",
      cat1Q1: "\u042F\u043A\u0430 \u0434\u043E\u0432\u0436\u0438\u043D\u0430 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0434\u043B\u044F \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443?",
      cat1A1: "\u0414\u043B\u044F \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u043E\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u043F\u0440\u0438\u0431\u043B\u0438\u0437\u043D\u043E \u044F\u043A \u0437\u0435\u0440\u043D\u044F\u0442\u043A\u043E \u0440\u0438\u0441\u0443 (\u0431\u043B\u0438\u0437\u044C\u043A\u043E 5\u20137 \u043C\u043C). \u042F\u043A\u0449\u043E \u0432\u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442\u0435 \u0432\u0456\u0434 \u0433\u043E\u043B\u0456\u043D\u043D\u044F, \u043E\u0441\u044C \u043E\u043F\u0442\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0447\u0430\u0441 \u0432\u0456\u0434\u0440\u043E\u0449\u0443\u0432\u0430\u043D\u043D\u044F \u0434\u043B\u044F \u043A\u043E\u0436\u043D\u043E\u0457 \u0437\u043E\u043D\u0438:\n\u041F\u0430\u0445\u0432\u0438: 10\u201314 \u0434\u043D\u0456\u0432 \u0432\u0456\u0434\u0440\u043E\u0441\u0442\u0430\u043D\u043D\u044F.\n\u0411\u0456\u043A\u0456\u043D\u0456 / \u0413\u043E\u043B\u043B\u0456\u0432\u0443\u0434: 12\u201316 \u0434\u043D\u0456\u0432 \u0432\u0456\u0434\u0440\u043E\u0441\u0442\u0430\u043D\u043D\u044F.\n\u041D\u043E\u0433\u0438: 2\u20133 \u0442\u0438\u0436\u043D\u0456 (2 \u0442\u0438\u0436\u043D\u0456 \u0434\u043E\u0441\u0442\u0430\u0442\u043D\u044C\u043E \u0434\u043B\u044F \u0433\u043E\u043C\u0456\u043B\u043E\u043A, \u0430\u043B\u0435 \u0441\u0442\u0435\u0433\u043D\u0430 \u043F\u0456\u0441\u043B\u044F \u0433\u043E\u043B\u0456\u043D\u043D\u044F \u0432\u0456\u0434\u0440\u043E\u0441\u0442\u0430\u044E\u0442\u044C \u0437\u043D\u0430\u0447\u043D\u043E \u043F\u043E\u0432\u0456\u043B\u044C\u043D\u0456\u0448\u0435, \u0442\u043E\u043C\u0443 \u0434\u043B\u044F \u043F\u043E\u0432\u043D\u0438\u0445 \u043D\u0456\u0433 \u043A\u0440\u0430\u0449\u0435 3 \u0442\u0438\u0436\u043D\u0456)",
      cat1Q2: "\u042F \u0437\u0431\u0438\u0440\u0430\u044E\u0441\u044F \u0443 \u0432\u0456\u0434\u043F\u0443\u0441\u0442\u043A\u0443 \u0456 \u043D\u0435 \u0432\u0441\u0442\u0438\u0433\u0430\u044E \u0432\u0456\u0434\u0440\u043E\u0441\u0442\u0438\u0442\u0438 \u0432\u043E\u043B\u043E\u0441\u0441\u044F. \u0427\u0438 \u043C\u043E\u0436\u043D\u0430 \u0432\u0441\u0435 \u043E\u0434\u043D\u043E \u0437\u0440\u043E\u0431\u0438\u0442\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433?",
      cat1A2: "\u0422\u0430\u043A, \u0437\u0432\u0456\u0441\u043D\u043E! \u041C\u0438 \u0432\u0441\u0435 \u043E\u0434\u043D\u043E \u043C\u043E\u0436\u0435\u043C\u043E \u043F\u0440\u043E\u0432\u0435\u0441\u0442\u0438 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443. \u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0447\u0430\u0441 \u0432\u0456\u0434\u0440\u043E\u0449\u0443\u0432\u0430\u043D\u043D\u044F \u0434\u043B\u044F \u0435\u043A\u0441\u0442\u0440\u0435\u043D\u043E\u0433\u043E \u0430\u0431\u043E \u0432\u0456\u0434\u043F\u0443\u0441\u043A\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0438\u0441\u0443:\n\u041F\u0430\u0445\u0432\u0438: 7 \u0434\u043D\u0456\u0432.\n\u0411\u0456\u043A\u0456\u043D\u0456: 12 \u0434\u043D\u0456\u0432.\n\u041D\u043E\u0433\u0438: 8\u201312 \u0434\u043D\u0456\u0432.\n\n\u0423 \u0442\u0430\u043A\u0438\u0445 \u0432\u0438\u043F\u0430\u0434\u043A\u0430\u0445 \u044F \u0437\u0430\u0432\u0436\u0434\u0438 \u0434\u043E\u043A\u043B\u0430\u0434\u0430\u044E \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u0437\u0443\u0441\u0438\u043B\u044C, \u0449\u043E\u0431 \u0434\u0430\u0442\u0438 \u0432\u0430\u043C \u043D\u0430\u0439\u0447\u0438\u0441\u0442\u0456\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442. \u0426\u0435 \u0432\u0441\u0435 \u043E\u0434\u043D\u043E \u0437\u043D\u0430\u0447\u043D\u043E \u043A\u0440\u0430\u0449\u0438\u0439 \u0432\u0430\u0440\u0456\u0430\u043D\u0442, \u043D\u0456\u0436 \u0433\u043E\u043B\u0438\u0442\u0438\u0441\u044F \u043F\u0435\u0440\u0435\u0434 \u0432\u0456\u0434\u043F\u0443\u0441\u0442\u043A\u043E\u044E! \u041F\u0440\u043E\u0442\u0435 \u043C\u0430\u0439\u0442\u0435 \u043D\u0430 \u0443\u0432\u0430\u0437\u0456, \u0449\u043E \u0434\u0435\u044F\u043A\u0456 \u043A\u0440\u0438\u0445\u0456\u0442\u043D\u0456 \u0432\u043E\u043B\u043E\u0441\u0438\u043D\u0438 \u043C\u043E\u0436\u0443\u0442\u044C \u0449\u0435 \u0442\u0456\u043B\u044C\u043A\u0438 \u043F\u0440\u043E\u0431\u0438\u0432\u0430\u0442\u0438\u0441\u044F \u043A\u0440\u0456\u0437\u044C \u0448\u043A\u0456\u0440\u0443, \u0456 \u044F \u0444\u0456\u0437\u0438\u0447\u043D\u043E \u043D\u0435 \u0437\u043C\u043E\u0436\u0443 \u0457\u0445 \u0437\u0430\u0445\u043E\u043F\u0438\u0442\u0438. \u0423 \u043C\u0435\u043D\u0435 \u0454 \u0432\u0435\u043B\u0438\u043A\u0438\u0439 \u0434\u043E\u0441\u0432\u0456\u0434 \u0440\u043E\u0431\u043E\u0442\u0438 \u0437 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u043C \u0432\u043E\u043B\u043E\u0441\u0441\u044F\u043C \u2014 \u043D\u0430\u0432\u0456\u0442\u044C \u0456\u0437 \u043F\u0430\u0445\u0432\u0430\u043C\u0438, \u0434\u0435 \u043F\u0440\u043E\u0439\u0448\u043B\u043E \u043B\u0438\u0448\u0435 5 \u0434\u043D\u0456\u0432 \u043F\u0456\u0441\u043B\u044F \u0433\u043E\u043B\u0456\u043D\u043D\u044F, \u0430\u0431\u043E \u0437 \u043D\u043E\u0433\u0430\u043C\u0438 \u0447\u0435\u0440\u0435\u0437 7 \u0434\u043D\u0456\u0432. \u0414\u043B\u044F \u0432\u0456\u0434\u043F\u0443\u0441\u0442\u043A\u0438 \u0446\u0435 \u0431\u0443\u0434\u0435 \u0447\u0443\u0434\u043E\u0432\u043E, \u0430\u043B\u0435 \u0449\u043E\u0431 \u0432\u0456\u0434\u0447\u0443\u0442\u0438 \u043F\u043E\u0432\u043D\u0438\u0439 \u0435\u0444\u0435\u043A\u0442 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443 \u2014 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u0443 \u0434\u043E\u0442\u0440\u0438\u043C\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0438\u0445 \u0442\u0435\u0440\u043C\u0456\u043D\u0456\u0432!",
      cat1Q3: "\u0410 \u044F\u043A\u0449\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0437\u043D\u0430\u0447\u043D\u043E \u0434\u043E\u0432\u0448\u0435, \u043D\u0456\u0436 2\u20133 \u0442\u0438\u0436\u043D\u0456? \u0427\u0438 \u043C\u043E\u0436\u043D\u0430 \u0432\u0441\u0435 \u043E\u0434\u043D\u043E \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F?",
      cat1A3: "\u0422\u0430\u043A, \u043C\u043E\u0436\u043D\u0430. \u042F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u043F\u0440\u0430\u0446\u044E\u044E \u0437 \u043A\u043B\u0456\u0454\u043D\u0442\u043A\u0430\u043C\u0438, \u0443 \u044F\u043A\u0438\u0445 \u0434\u043E\u0432\u0433\u0435 \u0432\u0456\u0434\u0440\u043E\u0449\u0443\u0432\u0430\u043D\u043D\u044F. \u0417\u0432\u0435\u0440\u043D\u0456\u0442\u044C \u0443\u0432\u0430\u0433\u0443, \u0449\u043E \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u043C\u043E\u0436\u0435 \u0431\u0443\u0442\u0438 \u0442\u0440\u043E\u0445\u0438 \u0456\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u0456\u0448\u043E\u044E, \u043E\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u043C\u0438 \u0432\u0438\u0434\u0430\u043B\u044F\u0454\u043C\u043E \u0431\u0456\u043B\u044C\u0448\u0435 \u0432\u043E\u043B\u043E\u0441\u0438\u043D \u0437\u0430 \u0440\u0430\u0437. \u0410\u043B\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u0435\u0440\u0435\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0432\u0430\u0448\u0456 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u2014 \u043C\u0438 \u0437\u0430\u0445\u043E\u043F\u0438\u043C\u043E \u0431\u0456\u043B\u044C\u0448\u0438\u0439 \u043E\u0431\u0441\u044F\u0433 \u0432\u043E\u043B\u043E\u0441\u0441\u044F, \u0456 \u0433\u043B\u0430\u0434\u043A\u0456\u0441\u0442\u044C \u0442\u0440\u0438\u0432\u0430\u0442\u0438\u043C\u0435 \u0434\u043E\u0432\u0448\u0435!\n\n\u0412\u0430\u0436\u043B\u0438\u0432\u043E: \u042F\u043A\u0449\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0437\u043D\u0430\u0447\u043D\u043E \u0434\u043E\u0432\u0448\u0435, \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u044C\u0442\u0435 \u043C\u0435\u043D\u0435 \u0437\u0430\u0437\u0434\u0430\u043B\u0435\u0433\u0456\u0434\u044C. \u041C\u0435\u043D\u0456 \u0437\u043D\u0430\u0434\u043E\u0431\u0438\u0442\u044C\u0441\u044F \u0431\u0456\u043B\u044C\u0448\u0435 \u0447\u0430\u0441\u0443 \u043D\u0430 \u0432\u0430\u0448 \u0437\u0430\u043F\u0438\u0441, \u0456 \u0434\u043E \u0432\u0430\u0440\u0442\u043E\u0441\u0442\u0456 \u0431\u0443\u0434\u0435 \u0434\u043E\u0434\u0430\u043D\u0430 \u043D\u0430\u0434\u0431\u0430\u0432\u043A\u0430 \u0432\u0456\u0434 +\xA35 \u0434\u043E \xA330 \u0437\u0430\u043B\u0435\u0436\u043D\u043E \u0432\u0456\u0434 \u0441\u043A\u043B\u0430\u0434\u043D\u043E\u0441\u0442\u0456. \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043D\u0435 \u043F\u0456\u0434\u0440\u0456\u0437\u0430\u0439\u0442\u0435 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u043E \u0432\u0434\u043E\u043C\u0430 \u2014 \u0434\u0443\u0436\u0435 \u043B\u0435\u0433\u043A\u043E \u0437\u0440\u0456\u0437\u0430\u0442\u0438 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u043E (\u043E\u0441\u043E\u0431\u043B\u0438\u0432\u043E \u0432 \u0437\u043E\u043D\u0456 \u0431\u0456\u043A\u0456\u043D\u0456). \u042F\u043A\u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0442\u0440\u043E\u0445\u0438 \u043F\u0456\u0434\u0440\u0456\u0432\u043D\u044F\u0442\u0438 \u2014 \u043C\u043E\u0436\u043D\u0430 \u0430\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0442\u0440\u0438\u043C\u0435\u0440\u043E\u043C \u0434\u043E \u0434\u043E\u0432\u0436\u0438\u043D\u0438 5\u20137 \u043C\u043C.",
      cat1Q4: "\u0429\u043E \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0437\u0440\u043E\u0431\u0438\u0442\u0438 \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u043F\u0438\u0441\u043E\u043C?",
      cat1A4: "\u041C\u043E\u0436\u043D\u0430 \u0437\u0440\u043E\u0431\u0438\u0442\u0438 \u043B\u0435\u0433\u043A\u0438\u0439 \u043F\u0456\u043B\u0456\u043D\u0433 \u0437\u0430 5 \u0434\u043D\u0456\u0432 \u0434\u043E \u0437\u0430\u043F\u043B\u0430\u043D\u043E\u0432\u0430\u043D\u043E\u0433\u043E \u0441\u0435\u0430\u043D\u0441\u0443. \u0423 \u0434\u0435\u043D\u044C \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u043F\u0440\u0438\u0439\u043C\u0456\u0442\u044C \u0434\u0443\u0448. \u042F\u043A\u0449\u043E \u0432\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442\u0435 \u043E\u0434\u0440\u0430\u0437\u0443 \u043F\u0456\u0441\u043B\u044F \u0440\u043E\u0431\u043E\u0442\u0438 \u2014 \u043D\u0435 \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435, \u0456\u043D\u0442\u0438\u043C\u043D\u0456 \u0432\u043E\u043B\u043E\u0433\u0456 \u0441\u0435\u0440\u0432\u0435\u0442\u043A\u0438 \u0431\u0443\u0434\u0443\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0456 \u043F\u0440\u044F\u043C\u043E \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0447\u0430\u0442\u043A\u043E\u043C.\n\n\u041A\u043B\u044E\u0447\u043E\u0432\u0456 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457 \u0437\u0430\u043B\u0435\u0436\u043D\u043E \u0432\u0456\u0434 \u0437\u043E\u043D\u0438:\n\n\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0438\u0447\u0447\u044F: \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043D\u0435 \u043D\u0430\u043D\u043E\u0441\u044C\u0442\u0435 \u0436\u043E\u0434\u043D\u043E\u0433\u043E \u043C\u0430\u043A\u0456\u044F\u0436\u0443 \u0430\u0431\u043E \u043A\u043E\u0441\u043C\u0435\u0442\u0438\u0447\u043D\u0438\u0445 \u0437\u0430\u0441\u043E\u0431\u0456\u0432 \u0443 \u0434\u0435\u043D\u044C \u0432\u0456\u0437\u0438\u0442\u0443, \u043E\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u0446\u0435 \u0431\u0435\u0437\u043F\u043E\u0441\u0435\u0440\u0435\u0434\u043D\u044C\u043E \u0432\u043F\u043B\u0438\u0432\u0430\u0454 \u043D\u0430 \u044F\u043A\u0456\u0441\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438. \u042F\u043A\u0449\u043E \u0432\u0438 \u0432\u0441\u0435 \u0436 \u043F\u0440\u0438\u0439\u0448\u043B\u0438 \u0437 \u043C\u0430\u043A\u0456\u044F\u0436\u0435\u043C \u2014 \u043D\u0435 \u0445\u0432\u0438\u043B\u044E\u0439\u0442\u0435\u0441\u044F, \u044F \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u043E \u043E\u0447\u0438\u0449\u0443 \u0448\u043A\u0456\u0440\u0443 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0447\u0430\u0442\u043A\u043E\u043C \u0456 \u0437\u0440\u043E\u0431\u043B\u044E \u0432\u0441\u0435 \u043C\u043E\u0436\u043B\u0438\u0432\u0435 \u0434\u043B\u044F \u0433\u0430\u0440\u043D\u043E\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443. \u0410\u043B\u0435 \u0446\u0456 \u0434\u0440\u0456\u0431\u043D\u0438\u0446\u0456 \u043C\u0430\u044E\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F, \u0442\u043E\u043C\u0443 \u043A\u0440\u0430\u0449\u0435 \u043F\u0456\u0434\u0433\u043E\u0442\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u0437\u0430\u0437\u0434\u0430\u043B\u0435\u0433\u0456\u0434\u044C.\n\n\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E: \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0443\u043D\u0438\u043A\u0430\u0439\u0442\u0435 \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u043D\u044F \u0433\u0443\u0441\u0442\u0438\u0445 \u043A\u0440\u0435\u043C\u0456\u0432, \u043E\u043B\u0456\u0439 \u0430\u0431\u043E \u0434\u0435\u0437\u043E\u0434\u043E\u0440\u0430\u043D\u0442\u0456\u0432 \u043D\u0430 \u0437\u043E\u043D\u0438, \u0434\u0435 \u0431\u0443\u0434\u0435 \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0438\u0441\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430, \u0443 \u0434\u0435\u043D\u044C \u0437\u0430\u043F\u0438\u0441\u0443.\n\n\u0422\u0430\u043A\u043E\u0436 \u0434\u0443\u0436\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E \u043D\u0430\u0434\u044F\u0433\u0442\u0438 \u0430\u0431\u043E \u0432\u0437\u044F\u0442\u0438 \u0437 \u0441\u043E\u0431\u043E\u044E \u0437\u0440\u0443\u0447\u043D\u0438\u0439, \u0432\u0456\u043B\u044C\u043D\u0438\u0439 \u043E\u0434\u044F\u0433, \u0431\u0430\u0436\u0430\u043D\u043E \u0437 \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u0438\u0445 \u0442\u043A\u0430\u043D\u0438\u043D. \u0426\u0435 \u0434\u043E\u0437\u0432\u043E\u043B\u044F\u0454 \u0448\u043A\u0456\u0440\u0456 \u0434\u0438\u0445\u0430\u0442\u0438 \u0442\u0430 \u043C\u0456\u043D\u0456\u043C\u0456\u0437\u0443\u0454 \u0442\u0435\u0440\u0442\u044F \u043F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438.",
      cat1Q5: "\u042F \u0441\u043A\u043E\u0440\u043E \u0457\u0434\u0443 \u0443 \u0432\u0456\u0434\u043F\u0443\u0441\u0442\u043A\u0443. \u041A\u043E\u043B\u0438 \u043A\u0440\u0430\u0449\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F?",
      cat1A5: "\u041E\u043F\u0442\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u2014 \u0437\u0430 2\u20133 \u0434\u043D\u0456 \u0434\u043E \u0432\u0456\u0434\u043B\u044C\u043E\u0442\u0443. \u0428\u043A\u0456\u0440\u0456 \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E 24\u201348 \u0433\u043E\u0434\u0438\u043D \u0434\u043B\u044F \u043F\u043E\u0432\u043D\u043E\u0433\u043E \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u0435\u0440\u0435\u0434 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u043C \u0456\u0437 \u0441\u043E\u043D\u0446\u0435\u043C, \u043A\u0443\u043F\u0430\u043D\u043D\u044F\u043C \u0447\u0438 \u0441\u0430\u0443\u043D\u043E\u044E.\n\n\u0412\u0430\u0436\u043B\u0438\u0432\u043E \u0434\u043B\u044F \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457 \u043E\u0431\u043B\u0438\u0447\u0447\u044F: \u041E\u0431\u043B\u0438\u0447\u0447\u044F \u2014 \u0434\u0443\u0436\u0435 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0430 \u0437\u043E\u043D\u0430, \u044F\u043A\u0456\u0439 \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0431\u0456\u043B\u044C\u0448\u0435 \u0447\u0430\u0441\u0443 \u0434\u043B\u044F \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F. \u042F\u043A\u0449\u043E \u0432\u0438 \u0432\u043F\u0435\u0440\u0448\u0435 \u0440\u043E\u0431\u0438\u0442\u0435 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044E \u043E\u0431\u043B\u0438\u0447\u0447\u044F, \u0434\u0443\u0436\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u0437\u0430 5\u20137 \u0434\u043D\u0456\u0432 \u0434\u043E \u0432\u0430\u0436\u043B\u0438\u0432\u043E\u0457 \u043F\u043E\u0434\u0456\u0457 \u0430\u0431\u043E \u0432\u0456\u0434\u043F\u0443\u0441\u0442\u043A\u0438. \u0414\u043B\u044F \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u0438\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432 \u2014 \u0437\u0430 3 \u0434\u043D\u0456 \u0431\u0443\u0434\u0435 \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E!",
      cat2Name: "\u0414\u043E\u0441\u0432\u0456\u0434 \u0442\u0430 \u0443\u043C\u043E\u0432\u0438",
      cat2Q1: "\u0427\u0438 \u0431\u043E\u043B\u044F\u0447\u0435?",
      cat2A1: "\u041E\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u0446\u0443\u043A\u0440\u043E\u0432\u0430 \u043F\u0430\u0441\u0442\u0430 \u0447\u0456\u043F\u043B\u044F\u0454\u0442\u044C\u0441\u044F \u043B\u0438\u0448\u0435 \u0437\u0430 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0442\u0430 \u043E\u0440\u043E\u0433\u043E\u0432\u0456\u043B\u0456 \u043A\u043B\u0456\u0442\u0438\u043D\u0438 \u2014 \u0430\u043B\u0435 \u043D\u0435 \u0437\u0430 \u0436\u0438\u0432\u0443 \u0448\u043A\u0456\u0440\u0443 \u2014 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u0437\u043D\u0430\u0447\u043D\u043E \u043C\u0435\u043D\u0448 \u0431\u043E\u043B\u044E\u0447\u0430, \u043D\u0456\u0436 \u0442\u0440\u0430\u0434\u0438\u0446\u0456\u0439\u043D\u0430 \u0432\u043E\u0441\u043A\u043E\u0432\u0430 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F.\n\n\u042F\u043A \u0436\u0456\u043D\u043A\u0438, \u043C\u0438 \u0432\u0441\u0456 \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u0454\u043C\u043E \u0431\u0456\u043B\u044C \u043F\u043E-\u0440\u0456\u0437\u043D\u043E\u043C\u0443: \u0443 \u043A\u043E\u0433\u043E\u0441\u044C \u0432\u0438\u0441\u043E\u043A\u0438\u0439 \u0431\u043E\u043B\u044C\u043E\u0432\u0438\u0439 \u043F\u043E\u0440\u0456\u0433, \u0430 \u0445\u0442\u043E\u0441\u044C \u0431\u0456\u043B\u044C\u0448 \u0447\u0443\u0442\u043B\u0438\u0432\u0438\u0439. \u041C\u043E\u044F \u0430\u0432\u0442\u043E\u0440\u0441\u044C\u043A\u0430 \u0442\u0435\u0445\u043D\u0456\u043A\u0430 \u0433\u0430\u0440\u0430\u043D\u0442\u0443\u0454, \u0449\u043E \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u0439 \u043B\u0435\u0433\u043A\u0438\u0439 \u0434\u0438\u0441\u043A\u043E\u043C\u0444\u043E\u0440\u0442 \u0432\u0456\u0434\u0447\u0443\u0432\u0430\u0454\u0442\u044C\u0441\u044F \u043B\u0438\u0448\u0435 \u0432 \u0442\u0443 \u0441\u0430\u043C\u0443 \u0441\u0435\u043A\u0443\u043D\u0434\u0443, \u043A\u043E\u043B\u0438 \u0432\u0438\u0434\u0430\u043B\u044F\u0454\u0442\u044C\u0441\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u2014 \u0456 \u043C\u0438\u043D\u0430\u0454 \u043C\u0438\u0442\u0442\u0454\u0432\u043E.\n\n\u0411\u0430\u0433\u0430\u0442\u043E \u043C\u043E\u0457\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u043E\u043A \u0449\u0438\u0440\u043E \u0434\u0438\u0432\u0443\u044E\u0442\u044C\u0441\u044F, \u043D\u0430\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u043C\u0456\u0439 \u043C\u0435\u0442\u043E\u0434 \u0432\u0456\u0434\u0440\u0456\u0437\u043D\u044F\u0454\u0442\u044C\u0441\u044F \u0432\u0456\u0434 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044C\u043E\u0433\u043E \u0434\u043E\u0441\u0432\u0456\u0434\u0443 \u0456 \u043D\u0430\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E. \u0426\u0435 \u0442\u043E\u043C\u0443, \u0449\u043E \u044F \u0433\u043B\u0438\u0431\u043E\u043A\u043E \u0432\u0438\u0432\u0447\u0438\u043B\u0430 \u043C\u0435\u0445\u0430\u043D\u0456\u043A\u0443 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457 \u0442\u0430 \u043E\u043F\u0430\u043D\u0443\u0432\u0430\u043B\u0430 \u0432\u0441\u0456 \u0442\u0435\u0445\u043D\u0456\u0447\u043D\u0456 \u043D\u044E\u0430\u043D\u0441\u0438, \u044F\u043A\u0456 \u0437\u043D\u0438\u0436\u0443\u044E\u0442\u044C \u0447\u0443\u0442\u043B\u0438\u0432\u0456\u0441\u0442\u044C \u0448\u043A\u0456\u0440\u0438. \u041F\u0440\u043E\u0441\u0442\u0456\u0448\u0435 \u043A\u0430\u0436\u0443\u0447\u0438 \u2014 \u044F \u0437\u043D\u0430\u044E, \u044F\u043A \u0437\u0440\u043E\u0431\u0438\u0442\u0438 \u043F\u0440\u043E\u0446\u0435\u0441 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u0431\u0435\u0437\u0431\u043E\u043B\u0456\u0441\u043D\u0438\u043C.\n\n\u0417\u0432\u0456\u0441\u043D\u043E, \u0432\u0430\u0448\u0430 \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0456\u0441\u0442\u044C \u0442\u0430\u043A\u043E\u0436 \u0432\u0456\u0434\u0456\u0433\u0440\u0430\u0454 \u0432\u0430\u0436\u043B\u0438\u0432\u0443 \u0440\u043E\u043B\u044C. \u041A\u043E\u0436\u043D\u0430 \u043A\u043B\u0456\u0454\u043D\u0442\u043A\u0430 \u0440\u0435\u0430\u0433\u0443\u0454 \u043F\u043E-\u0441\u0432\u043E\u0454\u043C\u0443: \u0434\u0435\u044F\u043A\u0456 \u0442\u0430\u043A \u0440\u043E\u0437\u0441\u043B\u0430\u0431\u043B\u044F\u044E\u0442\u044C\u0441\u044F, \u0449\u043E \u0445\u043E\u0447\u0443\u0442\u044C \u0441\u043F\u0430\u0442\u0438, \u0430 \u0456\u043D\u0448\u0456 \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u044E\u0442\u044C \u0445\u0432\u0438\u043B\u0438\u043D\u043A\u0438 \u043A\u043E\u043D\u0446\u0435\u043D\u0442\u0440\u0430\u0446\u0456\u0457. \u0417 \u043A\u043E\u0436\u043D\u0438\u043C \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u043C \u0441\u0435\u0430\u043D\u0441\u043E\u043C \u0441\u0442\u0430\u0454 \u0432\u0441\u0435 \u043B\u0435\u0433\u0448\u0435 \u2014 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0441\u0442\u0430\u0454 \u0442\u043E\u043D\u0448\u0438\u043C \u0456 \u043C'\u044F\u043A\u0448\u0438\u043C!\n\n\u041F\u043E\u0440\u0430\u0434\u0430 \u0449\u043E\u0434\u043E \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u043E\u0433\u043E \u0447\u0430\u0441\u0443 \u0434\u043B\u044F \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E\u0457 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438:\n\n\u0421\u0442\u0435\u0436\u0442\u0435 \u0437\u0430 \u0441\u0432\u043E\u0457\u043C \u043C\u0435\u043D\u0441\u0442\u0440\u0443\u0430\u043B\u044C\u043D\u0438\u043C \u0446\u0438\u043A\u043B\u043E\u043C. \u0417\u0430\u0433\u0430\u043B\u043E\u043C \u0436\u0456\u043D\u043A\u0438 \u0431\u0456\u043B\u044C\u0448 \u0447\u0443\u0442\u043B\u0438\u0432\u0456 \u043F\u0435\u0440\u0435\u0434 \u043C\u0435\u043D\u0441\u0442\u0440\u0443\u0430\u0446\u0456\u0454\u044E \u0442\u0430 \u043F\u0456\u0434 \u0447\u0430\u0441 \u043E\u0432\u0443\u043B\u044F\u0446\u0456\u0457. \u041D\u0430\u0439\u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u0456\u0448\u0438\u0439 \u0447\u0430\u0441 \u2014 \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439 \u043E\u0434\u0440\u0430\u0437\u0443 \u043F\u0456\u0441\u043B\u044F \u043C\u0456\u0441\u044F\u0447\u043D\u0438\u0445. \u041F\u0440\u043E\u0442\u0435 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430 \u043F\u043E\u043A\u0430\u0437\u0443\u0454, \u0449\u043E \u043A\u043E\u0436\u0435\u043D \u043E\u0440\u0433\u0430\u043D\u0456\u0437\u043C \u0436\u0438\u0432\u0435 \u0437\u0430 \u0441\u0432\u043E\u0457\u043C \u0443\u043D\u0456\u043A\u0430\u043B\u044C\u043D\u0438\u043C \u0440\u0438\u0442\u043C\u043E\u043C. \u0414\u0435\u044F\u043A\u0456 \u043C\u043E\u0457 \u043A\u043B\u0456\u0454\u043D\u0442\u043A\u0438 \u0432\u0456\u0434\u0447\u0443\u0432\u0430\u044E\u0442\u044C \u043D\u0430\u0439\u043C\u0435\u043D\u0448\u0435 \u0447\u0443\u0442\u043B\u0438\u0432\u043E\u0441\u0442\u0456 \u044F\u043A\u0440\u0430\u0437 \u043D\u0430\u043F\u0435\u0440\u0435\u0434\u043E\u0434\u043D\u0456 \u0430\u0431\u043E \u043F\u0456\u0434 \u0447\u0430\u0441 \u0446\u0438\u043A\u043B\u0443. \u0412\u0441\u0435 \u043F\u0440\u043E \u0442\u0435, \u0449\u043E\u0431 \u043F\u0440\u0438\u0441\u043B\u0443\u0445\u0430\u0442\u0438\u0441\u044F \u0434\u043E \u0441\u0432\u043E\u0433\u043E \u0442\u0456\u043B\u0430.",
      cat2Q2: "\u0427\u0438 \u043C\u043E\u0436\u043D\u0430 \u0440\u043E\u0431\u0438\u0442\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043F\u0456\u0434 \u0447\u0430\u0441 \u043C\u0435\u043D\u0441\u0442\u0440\u0443\u0430\u0446\u0456\u0457?",
      cat2A2: "\u0422\u0430\u043A, \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E. \u041C\u0456\u0441\u044F\u0447\u043D\u0456 \u2014 \u043D\u0435 \u043F\u0440\u0438\u0447\u0438\u043D\u0430 \u0441\u043A\u0430\u0441\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0437\u0430\u043F\u0438\u0441. \u042F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u043F\u0440\u043E\u0432\u043E\u0434\u0436\u0443 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0432 \u0446\u0435\u0439 \u0447\u0430\u0441. \u0412\u0430\u043C \u043B\u0438\u0448\u0435 \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u043D\u0430\u0434\u044F\u0433\u0442\u0438 \u0441\u0432\u0456\u0436\u0438\u0439 \u0442\u0430\u043C\u043F\u043E\u043D \u0430\u0431\u043E \u043C\u0435\u043D\u0441\u0442\u0440\u0443\u0430\u043B\u044C\u043D\u0443 \u0447\u0430\u0448\u0443 \u043F\u0435\u0440\u0435\u0434 \u0441\u0435\u0430\u043D\u0441\u043E\u043C. \u041C\u0430\u0439\u0442\u0435 \u043D\u0430 \u0443\u0432\u0430\u0437\u0456, \u0449\u043E \u0448\u043A\u0456\u0440\u0430 \u043C\u043E\u0436\u0435 \u0431\u0443\u0442\u0438 \u0442\u0440\u043E\u0445\u0438 \u0447\u0443\u0442\u043B\u0438\u0432\u0456\u0448\u043E\u044E \u0434\u043E \u0431\u043E\u043B\u044E \u043F\u0435\u0440\u0435\u0434 \u0446\u0438\u043A\u043B\u043E\u043C \u0442\u0430 \u043F\u0456\u0434 \u0447\u0430\u0441 \u043D\u044C\u043E\u0433\u043E, \u0430\u043B\u0435 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443 \u043C\u043E\u0436\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0441\u0442\u0438 \u0431\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u043E!",
      cat2Q3: "\u042F \u0432\u0430\u0433\u0456\u0442\u043D\u0430. \u0427\u0438 \u043C\u043E\u0436\u043D\u0430 \u043C\u0435\u043D\u0456 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F?",
      cat2A3: "\u0422\u0430\u043A, \u0437\u0432\u0456\u0441\u043D\u043E! \u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u2014 \u0446\u0435 100% \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u0438\u0439, \u043E\u0440\u0433\u0430\u043D\u0456\u0447\u043D\u0438\u0439 \u0442\u0430 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u0438\u0439 \u043C\u0435\u0442\u043E\u0434 \u044F\u043A \u0434\u043B\u044F \u0432\u0430\u0441, \u0442\u0430\u043A \u0456 \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u0434\u0438\u0442\u0438\u043D\u043A\u0438, \u043E\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u043F\u0430\u0441\u0442\u0430 \u043D\u0435 \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u0436\u043E\u0434\u043D\u043E\u0457 \u0445\u0456\u043C\u0456\u0457 \u0447\u0438 \u0442\u043E\u043A\u0441\u0438\u043D\u0456\u0432. \u0411\u0430\u0433\u0430\u0442\u043E \u043C\u043E\u0457\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u043E\u043A \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0443\u044E\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0430\u0436 \u0434\u043E \u043F\u043E\u043B\u043E\u0433\u0456\u0432 \u2014 \u0446\u0435 \u0434\u0430\u0454 \u043D\u0435\u0439\u043C\u043E\u0432\u0456\u0440\u043D\u0438\u0439 \u043A\u043E\u043C\u0444\u043E\u0440\u0442, \u0437\u0440\u0443\u0447\u043D\u0456\u0441\u0442\u044C \u0442\u0430 \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F \u043B\u0435\u0433\u043A\u043E\u0441\u0442\u0456, \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u043E \u0432 \u043E\u0441\u0442\u0430\u043D\u043D\u0456 \u043C\u0456\u0441\u044F\u0446\u0456.\n\n\u042F\u043A \u043C\u0430\u043C\u0430 \u0434\u0432\u043E\u0445 \u0434\u043E\u043D\u044C\u043E\u043A, \u044F \u0447\u0443\u0434\u043E\u0432\u043E \u0440\u043E\u0437\u0443\u043C\u0456\u044E \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u0456 \u043F\u043E\u0442\u0440\u0435\u0431\u0438 \u043C\u0430\u0439\u0431\u0443\u0442\u043D\u0456\u0445 \u043C\u0430\u043C, \u0442\u043E\u043C\u0443 \u0432\u0430\u0433\u0456\u0442\u043D\u0456 \u043A\u043B\u0456\u0454\u043D\u0442\u043A\u0438 \u2014 \u0434\u043B\u044F \u043C\u0435\u043D\u0435 \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F. \u0413\u043E\u043B\u043E\u0432\u043D\u0430 \u0443\u043C\u043E\u0432\u0430 \u2014 \u0432\u0430\u0433\u0456\u0442\u043D\u0456\u0441\u0442\u044C \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442\u044C \u0431\u0435\u0437 \u0443\u0441\u043A\u043B\u0430\u0434\u043D\u0435\u043D\u044C \u0456 \u043B\u0456\u043A\u0430\u0440 \u0434\u043E\u0437\u0432\u043E\u043B\u044F\u0454.\n\n\u041E\u0434\u043D\u0430\u043A \u043A\u0456\u043B\u044C\u043A\u0430 \u0432\u0430\u0436\u043B\u0438\u0432\u0438\u0445 \u0434\u0435\u0442\u0430\u043B\u0435\u0439:\n\n\u2022 \u042F\u043A\u0449\u043E \u0432\u0438 \u0432\u0436\u0435 \u0440\u043E\u0431\u0438\u043B\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433: \u0412\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0443\u0432\u0430\u0442\u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0456 \u0449\u043E\u043C\u0456\u0441\u044F\u0447\u043D\u0456 \u0441\u0435\u0430\u043D\u0441\u0438 \u0431\u0435\u0437 \u043F\u0435\u0440\u0435\u0440\u0432. \u0426\u0435 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u043E \u0456 \u0436\u043E\u0434\u043D\u0438\u043C \u0447\u0438\u043D\u043E\u043C \u043D\u0435 \u0432\u043F\u043B\u0438\u043D\u0435 \u043D\u0430 \u0432\u0430\u0448\u0443 \u0432\u0430\u0433\u0456\u0442\u043D\u0456\u0441\u0442\u044C.\n\n\u2022 \u042F\u043A\u0449\u043E \u0446\u0435 \u0432\u0430\u0448 \u043F\u0435\u0440\u0448\u0438\u0439 \u0440\u0430\u0437: \u0412\u0438 \u0432\u0441\u0435 \u043E\u0434\u043D\u043E \u043C\u043E\u0436\u0435\u0442\u0435 \u0437\u0440\u043E\u0431\u0438\u0442\u0438 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443. \u041E\u0434\u043D\u0430\u043A \u0443 \u043F\u0435\u0440\u0448\u043E\u043C\u0443 \u0442\u0440\u0438\u043C\u0435\u0441\u0442\u0440\u0456 \u0432\u0441\u0435 \u043D\u043E\u0432\u0435 \u043C\u043E\u0436\u0435 \u0432\u0438\u043A\u043B\u0438\u043A\u0430\u0442\u0438 \u043B\u0435\u0433\u043A\u0438\u0439 \u0441\u0442\u0440\u0435\u0441 \u043F\u0440\u043E\u0441\u0442\u043E \u0442\u043E\u043C\u0443, \u0449\u043E \u0432\u0438 \u043D\u0435 \u0437\u043D\u0430\u0454\u0442\u0435, \u0447\u043E\u0433\u043E \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u0442\u0438. \u0423 \u0442\u0430\u043A\u0438\u0445 \u0432\u0438\u043F\u0430\u0434\u043A\u0430\u0445 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E \u043F\u043E\u0447\u0435\u043A\u0430\u0442\u0438 \u0434\u043E 12-\u0433\u043E \u0442\u0438\u0436\u043D\u044F. \u041C\u043E\u0436\u0435\u043C\u043E \u043F\u043E\u0447\u0430\u0442\u0438 \u0437 \u043D\u0435\u0432\u0435\u043B\u0438\u043A\u0438\u0445 \u0437\u043E\u043D \u2014 \u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u043F\u0430\u0445\u0432 \u0430\u0431\u043E \u043A\u043B\u0430\u0441\u0438\u0447\u043D\u043E\u0433\u043E \u0431\u0456\u043A\u0456\u043D\u0456 \u2014 \u0449\u043E\u0431 \u043C'\u044F\u043A\u043E \u043F\u043E\u0437\u043D\u0430\u0439\u043E\u043C\u0438\u0442\u0438 \u0432\u0430\u0441 \u0456\u0437 \u0432\u0456\u0434\u0447\u0443\u0442\u0442\u044F\u043C\u0438.\n\n\u0413\u043E\u0440\u043C\u043E\u043D\u0438 \u0432\u0430\u0433\u0456\u0442\u043D\u043E\u0441\u0442\u0456 \u043C\u043E\u0436\u0443\u0442\u044C \u0441\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0440\u043E\u0431\u0438\u0442\u0438 \u0448\u043A\u0456\u0440\u0443 \u0442\u0440\u043E\u0445\u0438 \u0447\u0443\u0442\u043B\u0438\u0432\u0456\u0448\u043E\u044E, \u0442\u043E\u043C\u0443 \u044F \u043F\u0440\u0438\u0434\u0456\u043B\u044E \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u0443 \u0443\u0432\u0430\u0433\u0443 \u0432\u0430\u0448\u043E\u043C\u0443 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u0443. \u0426\u0456\u043A\u0430\u0432\u043E, \u0449\u043E \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430 \u043F\u043E\u043A\u0430\u0437\u0443\u0454: \u0447\u0438\u043C \u0431\u043B\u0438\u0436\u0447\u0435 \u0434\u043E \u043F\u043E\u043B\u043E\u0433\u0456\u0432, \u0442\u0438\u043C \u043C\u0435\u043D\u0448\u0435 \u0447\u0443\u0442\u043B\u0438\u0432\u043E\u0441\u0442\u0456. \u0412\u0430\u0448 \u043E\u0440\u0433\u0430\u043D\u0456\u0437\u043C \u0432\u0436\u0435 \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u043E \u0433\u043E\u0442\u0443\u0454\u0442\u044C\u0441\u044F \u0434\u043E \u043F\u043E\u043B\u043E\u0433\u0456\u0432, \u043F\u0456\u0434\u0432\u0438\u0449\u0443\u044E\u0447\u0438 \u0431\u043E\u043B\u044C\u043E\u0432\u0438\u0439 \u043F\u043E\u0440\u0456\u0433!",
      cat2Q4: "\u0423 \u043C\u0435\u043D\u0435 \u0431\u0430\u0433\u0430\u0442\u043E \u0440\u043E\u0434\u0438\u043C\u043E\u043A. \u0427\u0438 \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u043E \u0440\u043E\u0431\u0438\u0442\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433?",
      cat2A4: "\u0422\u0430\u043A, \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u043E! \u041D\u0430\u044F\u0432\u043D\u0456\u0441\u0442\u044C \u0440\u043E\u0434\u0438\u043C\u043E\u043A \u0436\u043E\u0434\u043D\u0438\u043C \u0447\u0438\u043D\u043E\u043C \u043D\u0435 \u0454 \u043F\u0440\u043E\u0442\u0438\u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043D\u044F\u043C \u0434\u043B\u044F \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443.\n\n\u0411\u0443\u0434\u044C-\u044F\u043A\u0456 \u043F\u043B\u043E\u0441\u043A\u0456 \u0440\u043E\u0434\u0438\u043C\u043A\u0438, \u0449\u043E \u043D\u0435 \u0432\u0438\u0441\u0442\u0443\u043F\u0430\u044E\u0442\u044C \u043D\u0430\u0434 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u0435\u044E \u0448\u043A\u0456\u0440\u0438 \u0442\u0430 \u043D\u0435 \u043C\u0430\u044E\u0442\u044C \u0432\u043E\u043B\u043E\u0441\u0441\u044F, \u2014 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u043E \u043E\u0431\u0440\u043E\u0431\u043B\u044F\u0442\u0438. \u0426\u0443\u043A\u0440\u043E\u0432\u0430 \u043F\u0430\u0441\u0442\u0430 \u043A\u043E\u0432\u0437\u0430\u0454 \u043F\u043E \u043D\u0438\u0445 \u0440\u0456\u0432\u043D\u043E \u0442\u0430 \u0431\u0435\u0437\u0431\u043E\u043B\u0456\u0441\u043D\u043E.\n\n\u0412\u0430\u0436\u043B\u0438\u0432\u043E \u043F\u0440\u043E \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u043D\u0430 \u0440\u043E\u0434\u0438\u043C\u043A\u0430\u0445: \u042F\u043A\u0449\u043E \u0437 \u0440\u043E\u0434\u0438\u043C\u043A\u0438 \u0440\u043E\u0441\u0442\u0435 \u0432\u043E\u043B\u043E\u0441\u0441\u044F, \u0439\u043E\u0433\u043E \u043D\u0456 \u0432 \u044F\u043A\u043E\u043C\u0443 \u0440\u0430\u0437\u0456 \u043D\u0435 \u043C\u043E\u0436\u043D\u0430 \u0432\u0438\u0434\u0430\u043B\u044F\u0442\u0438 \u043F\u0430\u0441\u0442\u043E\u044E \u0447\u0438 \u0449\u0438\u043F\u0446\u044F\u043C\u0438. \u0419\u043E\u0433\u043E \u043C\u043E\u0436\u043D\u0430 \u043B\u0438\u0448\u0435 \u0430\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u043F\u0456\u0434\u0441\u0442\u0440\u0438\u0433\u0442\u0438 \u043D\u043E\u0436\u0438\u0446\u044F\u043C\u0438, \u0430\u0431\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u0437\u0430\u043B\u0438\u0448\u0438\u0442\u0438 \u0446\u044E \u0437\u043E\u043D\u0443 \u043D\u0435\u0434\u043E\u0442\u043E\u0440\u043A\u0430\u043D\u043E\u044E.\n\n\u042F\u043A\u0449\u043E \u0440\u043E\u0434\u0438\u043C\u043A\u0430 \u043E\u043F\u0443\u043A\u043B\u0430, \u0432\u0435\u043B\u0438\u043A\u0430, \u0447\u0443\u0442\u043B\u0438\u0432\u0430 \u0430\u0431\u043E \u0437 \u0432\u043E\u043B\u043E\u0441\u0441\u044F\u043C \u2014 \u044F \u043F\u0440\u043E\u0441\u0442\u043E \u0430\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u043E\u0431\u0456\u0439\u0434\u0443 \u0457\u0457. \u041D\u0430\u0432\u0456\u0442\u044C \u044F\u043A\u0449\u043E \u0432\u043E\u043D\u0430 \u0440\u043E\u0437\u0442\u0430\u0448\u043E\u0432\u0430\u043D\u0430 \u0432 \u0434\u0443\u0436\u0435 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0456\u0439 \u0430\u0431\u043E \u0456\u043D\u0442\u0438\u043C\u043D\u0456\u0439 \u0437\u043E\u043D\u0456 (\u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434, \u0443 \u0437\u043E\u043D\u0456 \u0413\u043E\u043B\u043B\u0456\u0432\u0443\u0434\u0443) \u2014 \u0432\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0431\u0443\u0442\u0438 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0441\u043F\u043E\u043A\u0456\u0439\u043D\u0456.\n\n\u042F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u043F\u0440\u0430\u0446\u044E\u044E \u0437 \u043A\u043B\u0456\u0454\u043D\u0442\u043A\u0430\u043C\u0438, \u0443 \u044F\u043A\u0438\u0445 \u0454 \u0440\u043E\u0434\u0438\u043C\u043A\u0438. \u042F\u043A\u0449\u043E \u0446\u044F \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u0456\u0441\u0442\u044C \u0454 \u0443 \u0432\u0430\u0441 \u2014 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u044C\u0442\u0435 \u043C\u0435\u043D\u0435 \u0437\u0430\u0437\u0434\u0430\u043B\u0435\u0433\u0456\u0434\u044C. \u041C\u043E\u044F \u0442\u0435\u0445\u043D\u0456\u043A\u0430 \u0442\u0430 \u0440\u043E\u043A\u0438 \u0434\u043E\u0441\u0432\u0456\u0434\u0443 \u0434\u043E\u0437\u0432\u043E\u043B\u044F\u044E\u0442\u044C \u0431\u0435\u0437\u0434\u043E\u0433\u0430\u043D\u043D\u043E \u043F\u0440\u0430\u0446\u044E\u0432\u0430\u0442\u0438 \u0432 \u0442\u0430\u043A\u0438\u0445 \u0437\u043E\u043D\u0430\u0445, \u0433\u0430\u0440\u0430\u043D\u0442\u0443\u044E\u0447\u0438 100% \u0431\u0435\u0437\u043F\u0435\u043A\u0443 \u0448\u043A\u0456\u0440\u0438 \u0442\u0430 \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.",
      cat2Q5: "\u0427\u0438 \u043C\u043E\u0436\u043D\u0430 \u0440\u043E\u0431\u0438\u0442\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043F\u0440\u0438 \u0432\u0430\u0440\u0438\u043A\u043E\u0437\u0456?",
      cat2A5: "\u0422\u0430\u043A, \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E! \u0411\u0456\u043B\u044C\u0448\u0435 \u0442\u043E\u0433\u043E, \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u2014 \u0446\u0435 \u0441\u043F\u0440\u0430\u0432\u0434\u0456 \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0438\u0439 \u0442\u0430 \u043D\u0430\u0439\u0431\u0435\u0437\u043F\u0435\u0447\u043D\u0456\u0448\u0438\u0439 \u043C\u0435\u0442\u043E\u0434 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u0457 \u043F\u0440\u0438 \u0432\u0430\u0440\u0438\u043A\u043E\u0437\u0456. \u041D\u0430 \u0432\u0456\u0434\u043C\u0456\u043D\u0443 \u0432\u0456\u0434 \u0433\u0430\u0440\u044F\u0447\u043E\u0433\u043E \u0432\u043E\u0441\u043A\u0443, \u0446\u0443\u043A\u0440\u043E\u0432\u0430 \u043F\u0430\u0441\u0442\u0430 \u043D\u0430\u043D\u043E\u0441\u0438\u0442\u044C\u0441\u044F \u0437\u0430 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E\u0457 \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0438 \u0442\u0456\u043B\u0430 \u2014 \u0436\u043E\u0434\u043D\u043E\u0433\u043E \u0442\u0435\u043F\u043B\u0430, \u044F\u043A\u0435 \u0431 \u0440\u043E\u0437\u0448\u0438\u0440\u044E\u0432\u0430\u043B\u043E \u0441\u0443\u0434\u0438\u043D\u0438 \u0430\u0431\u043E \u0434\u0440\u0430\u0442\u0443\u0432\u0430\u043B\u043E \u043D\u043E\u0433\u0438.\n\n\u041F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u043D\u0430\u0434\u0437\u0432\u0438\u0447\u0430\u0439\u043D\u043E \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0430 \u0442\u0430 \u0434\u0431\u0430\u0439\u043B\u0438\u0432\u0430 \u0434\u043E \u0432\u0430\u0448\u043E\u0457 \u0448\u043A\u0456\u0440\u0438. \u042F\u043A\u0449\u043E \u0443 \u0432\u0430\u0441 \u0454 \u0432\u0430\u0440\u0438\u043A\u043E\u0437 \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u0442\u0435 \u043C\u0435\u043D\u0435 \u043F\u0435\u0440\u0435\u0434 \u0432\u0456\u0437\u0438\u0442\u043E\u043C. \u042F\u043A\u0449\u043E \u0454 \u0441\u0443\u043C\u043D\u0456\u0432\u0438 \u2014 \u0437\u0430\u0432\u0436\u0434\u0438 \u043C\u043E\u0436\u043D\u0430 \u043D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438 \u043C\u0435\u043D\u0456 \u0444\u043E\u0442\u043E \u0432 \u043E\u0441\u043E\u0431\u0438\u0441\u0442\u0456 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F, \u0456 \u044F \u0437 \u0440\u0430\u0434\u0456\u0441\u0442\u044E \u043F\u0440\u043E\u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0443\u044E \u0432\u0430\u0441 \u0434\u043E \u0437\u0430\u043F\u0438\u0441\u0443!",
      cat2Q6: "\u0423 \u043C\u0435\u043D\u0435 \u0454 \u0440\u043E\u0437\u0442\u044F\u0436\u043A\u0438. \u0427\u0438 \u043C\u043E\u0436\u043D\u0430 \u043C\u0435\u043D\u0456 \u0440\u043E\u0431\u0438\u0442\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433?",
      cat2A6: "\u0422\u0430\u043A, \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E! \u0420\u043E\u0437\u0442\u044F\u0436\u043A\u0438 \u2014 \u0446\u0435 \u0436\u043E\u0434\u043D\u0438\u043C \u0447\u0438\u043D\u043E\u043C \u043D\u0435 \u043F\u0435\u0440\u0435\u0448\u043A\u043E\u0434\u0430 \u0434\u043B\u044F \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443. \u041E\u0434\u043D\u0430\u043A \u0432\u0430\u0436\u043B\u0438\u0432\u043E \u0437\u043D\u0430\u0442\u0438, \u0449\u043E \u0448\u043A\u0456\u0440\u0430 \u0437 \u0440\u043E\u0437\u0442\u044F\u0436\u043A\u0430\u043C\u0438 \u0434\u0443\u0436\u0435 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0430, \u0442\u043E\u043D\u0448\u0430 \u0442\u0430 \u043C\u0430\u0454 \u0431\u0456\u043B\u044C\u0448\u0438\u0439 \u0440\u0438\u0437\u0438\u043A \u0442\u0440\u0430\u0432\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0456\u0457 \u0430\u0431\u043E \u043F\u0456\u0434\u0432\u0438\u0449\u0435\u043D\u043E\u0457 \u0447\u0443\u0442\u043B\u0438\u0432\u043E\u0441\u0442\u0456.\n\n\u0422\u043E\u043C\u0443 \u0442\u0430\u043A\u0456 \u0437\u043E\u043D\u0438 \u0432\u0438\u043C\u0430\u0433\u0430\u044E\u0442\u044C \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u043E\u0457 \u0442\u0435\u0445\u043D\u0456\u043A\u0438 \u0442\u0430 \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u043E\u0457 \u0443\u0432\u0430\u0433\u0438. \u042F \u043C\u0430\u044E \u0432\u0435\u043B\u0438\u043A\u0438\u0439 \u0434\u043E\u0441\u0432\u0456\u0434 \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u043E\u0457 \u0440\u043E\u0431\u043E\u0442\u0438 \u0437 \u0446\u0443\u043A\u0440\u043E\u0432\u043E\u044E \u043F\u0430\u0441\u0442\u043E\u044E \u043D\u0430 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0456\u0439 \u0448\u043A\u0456\u0440\u0456, \u0433\u0430\u0440\u0430\u043D\u0442\u0443\u044E\u0447\u0438 \u043F\u043E\u0432\u043D\u0438\u0439 \u0437\u0430\u0445\u0438\u0441\u0442. \u0414\u0443\u0436\u0435 \u0432\u0430\u0436\u043B\u0438\u0432\u043E \u0443\u0432\u0430\u0436\u043D\u043E \u043E\u0431\u0438\u0440\u0430\u0442\u0438 \u043C\u0430\u0439\u0441\u0442\u0440\u0430, \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u043E \u044F\u043A\u0449\u043E \u0443 \u0432\u0430\u0441 \u0454 \u0440\u043E\u0437\u0442\u044F\u0436\u043A\u0438 \u0432 \u0437\u043E\u043D\u0456 \u0431\u0456\u043A\u0456\u043D\u0456.\n\n\u0414\u043E \u0440\u0435\u0447\u0456, \u0446\u0443\u043A\u0440\u043E\u0432\u0430 \u043F\u0430\u0441\u0442\u0430 \u0434\u0456\u0454 \u044F\u043A \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u0438\u0439 \u0441\u043F\u0430-\u043F\u0456\u043B\u0456\u043D\u0433, \u0442\u043E\u043C\u0443 \u0448\u043A\u0456\u0440\u0430 \u043F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u0432\u0438\u0433\u043B\u044F\u0434\u0430\u0454 \u0437\u043D\u0430\u0447\u043D\u043E \u0440\u0456\u0432\u043D\u0456\u0448\u043E\u044E, \u043C'\u044F\u043A\u0448\u043E\u044E \u0442\u0430 \u0447\u0443\u0434\u043E\u0432\u043E \u0437\u0432\u043E\u043B\u043E\u0436\u0435\u043D\u043E\u044E. \u042F \u0437\u0430\u0432\u0436\u0434\u0438 \u0442\u0430\u043A \u043F\u0438\u0448\u0430\u044E\u0441\u044F, \u043A\u043E\u043B\u0438 \u043C\u043E\u0457 \u043A\u043B\u0456\u0454\u043D\u0442\u043A\u0438 \u0437 \u0440\u043E\u0437\u0442\u044F\u0436\u043A\u0430\u043C\u0438 \u043A\u0430\u0436\u0443\u0442\u044C, \u0449\u043E \u0432\u0456\u0434\u0447\u0443\u043B\u0438 \u043B\u0435\u0433\u043A\u0456\u0441\u0442\u044C \u0456 \u043A\u043E\u043C\u0444\u043E\u0440\u0442 \u043F\u0456\u0434 \u0447\u0430\u0441 \u0441\u0435\u0430\u043D\u0441\u0443. \u0412\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0431\u0443\u0442\u0438 \u043D\u0430 100% \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u043F\u0435\u0440\u0435\u0431\u0443\u0432\u0430\u0454\u0442\u0435 \u0432 \u043D\u0430\u0434\u0456\u0439\u043D\u0438\u0445, \u0434\u043E\u0441\u0432\u0456\u0434\u0447\u0435\u043D\u0438\u0445 \u0440\u0443\u043A\u0430\u0445!",
      cat2Q7: "\u0423 \u043C\u0435\u043D\u0435 \u0441\u0438\u043B\u044C\u043D\u0435 \u043F\u043E\u0442\u043E\u0432\u0438\u0434\u0456\u043B\u0435\u043D\u043D\u044F. \u0427\u0438 \u043F\u0456\u0434\u0445\u043E\u0434\u0438\u0442\u044C \u043C\u0435\u043D\u0456 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433?",
      cat2A7: "\u0422\u0430\u043A, \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E! \u0421\u0438\u043B\u044C\u043D\u0435 \u043F\u043E\u0442\u043E\u0432\u0438\u0434\u0456\u043B\u0435\u043D\u043D\u044F \u2014 \u0446\u0435 \u0436\u043E\u0434\u043D\u0438\u043C \u0447\u0438\u043D\u043E\u043C \u043D\u0435 \u043F\u0435\u0440\u0435\u0448\u043A\u043E\u0434\u0430. \u0426\u0443\u043A\u0440\u043E\u0432\u0430 \u043F\u0430\u0441\u0442\u0430 \u0447\u0443\u0434\u043E\u0432\u043E \u0441\u043F\u0440\u0430\u0432\u043B\u044F\u0454\u0442\u044C\u0441\u044F \u0437 \u0446\u0438\u043C \u0456 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u0454 \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0433\u043B\u0430\u0434\u043A\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.\n\n\u041F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0430 \u043C\u043E\u0436\u0435 \u0437\u0430\u0439\u043D\u044F\u0442\u0438 \u0442\u0440\u043E\u0445\u0438 \u0431\u0456\u043B\u044C\u0448\u0435 \u0447\u0430\u0441\u0443, \u0442\u043E\u043C\u0443 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u0442\u0435 \u043C\u0435\u043D\u0435 \u0437\u0430\u0437\u0434\u0430\u043B\u0435\u0433\u0456\u0434\u044C \u2014 \u044F \u0432\u0438\u0434\u0456\u043B\u044E \u0434\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0438\u0439 \u0447\u0430\u0441 \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u0437\u0430\u043F\u0438\u0441\u0443, \u0449\u043E\u0431 \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u0456\u0434\u0433\u043E\u0442\u0443\u0432\u0430\u0442\u0438 \u0448\u043A\u0456\u0440\u0443 \u0442\u0430 \u0437\u0440\u043E\u0431\u0438\u0442\u0438 \u0432\u0441\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u043E \u0442\u0430 \u044F\u043A\u0456\u0441\u043D\u043E!",
      cat2Q8: "\u0417 \u044F\u043A\u043E\u0433\u043E \u0432\u0456\u043A\u0443 \u043C\u043E\u0436\u043D\u0430 \u0440\u043E\u0431\u0438\u0442\u0438 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433?",
      cat2A8: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u2014 100% \u043E\u0440\u0433\u0430\u043D\u0456\u0447\u043D\u0438\u0439 \u0456 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u0431\u0435\u0437\u043F\u0435\u0447\u043D\u0438\u0439 \u0434\u043B\u044F \u043F\u0456\u0434\u043B\u0456\u0442\u043A\u0456\u0432. \u0426\u0435 \u0447\u0443\u0434\u043E\u0432\u0438\u0439 \u0432\u0430\u0440\u0456\u0430\u043D\u0442 \u0456\u0437 \u0442\u043E\u0433\u043E \u043C\u043E\u043C\u0435\u043D\u0442\u0443, \u044F\u043A \u0434\u0456\u0432\u0447\u0438\u043D\u043A\u0430 \u0441\u0430\u043C\u0430 \u0432\u0456\u0434\u0447\u0443\u0454 \u0433\u043E\u0442\u043E\u0432\u043D\u0456\u0441\u0442\u044C \u0456 \u0432\u0438\u044F\u0432\u0438\u0442\u044C \u0431\u0430\u0436\u0430\u043D\u043D\u044F \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043D\u0435\u0431\u0430\u0436\u0430\u043D\u0435 \u0432\u043E\u043B\u043E\u0441\u0441\u044F. \u0414\u043B\u044F \u043C\u0435\u043D\u0435 \u043D\u0430\u0434\u0437\u0432\u0438\u0447\u0430\u0439\u043D\u043E \u0432\u0430\u0436\u043B\u0438\u0432\u043E, \u0449\u043E\u0431 \u0446\u0435 \u0431\u0443\u043B\u043E \u0432\u0438\u043A\u043B\u044E\u0447\u043D\u043E \u0457\u0457 \u0432\u043B\u0430\u0441\u043D\u0435 \u0440\u0456\u0448\u0435\u043D\u043D\u044F \u2014 \u0457\u0457 \u043A\u043E\u043C\u0444\u043E\u0440\u0442 \u0456 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456\u0441\u0442\u044C \u043D\u0430 \u043F\u0435\u0440\u0448\u043E\u043C\u0443 \u043C\u0456\u0441\u0446\u0456.\n\n\u042F\u043A\u0449\u043E \u0432\u0430\u043C \u043D\u0435\u043C\u0430\u0454 18 \u2014 \u043C\u0438 \u043F\u0440\u043E\u0441\u0442\u043E \u0434\u043E\u0442\u0440\u0438\u043C\u0443\u0454\u043C\u043E\u0441\u044F \u043A\u0456\u043B\u044C\u043A\u043E\u0445 \u043F\u0440\u043E\u0441\u0442\u0438\u0445 \u043F\u0440\u0430\u0432\u0438\u043B:\n\n\u2022 \u041F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430 \u0431\u0430\u0442\u044C\u043A\u0456\u0432: \u0414\u043B\u044F \u0432\u0441\u0456\u0445, \u043A\u043E\u043C\u0443 \u043D\u0435\u043C\u0430\u0454 18, \u043D\u0430 \u043F\u0435\u0440\u0448\u0438\u0439 \u0437\u0430\u043F\u0438\u0441 \u043C\u0430\u0454 \u043F\u0440\u0438\u0439\u0442\u0438 \u0440\u0430\u0437\u043E\u043C \u0431\u0430\u0442\u044C\u043A\u043E \u0430\u0431\u043E \u043E\u043F\u0456\u043A\u0443\u043D, \u0449\u043E\u0431 \u043C\u0438 \u0440\u0430\u0437\u043E\u043C \u043F\u043E\u0441\u043F\u0456\u043B\u043A\u0443\u0432\u0430\u043B\u0438\u0441\u044F, \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u043B\u0438 \u043D\u0430 \u0432\u0441\u0456 \u0437\u0430\u043F\u0438\u0442\u0430\u043D\u043D\u044F \u0442\u0430 \u043F\u0456\u0434\u043F\u0438\u0441\u0430\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u0443 \u0444\u043E\u0440\u043C\u0443 \u0437\u0433\u043E\u0434\u0438.\n\n\u2022 \u0406\u043D\u0442\u0438\u043C\u043D\u0430 \u0437\u043E\u043D\u0430: \u0414\u043B\u044F \u043F\u0456\u0434\u043B\u0456\u0442\u043A\u0456\u0432 \u0434\u043E 18 \u043C\u0438 \u0437\u043E\u0441\u0435\u0440\u0435\u0434\u0436\u0443\u0454\u043C\u043E\u0441\u044F \u043D\u0430 \u0434\u0443\u0436\u0435 \u0434\u0435\u043B\u0456\u043A\u0430\u0442\u043D\u043E\u043C\u0443, \u043A\u043B\u0430\u0441\u0438\u0447\u043D\u043E\u043C\u0443 \u0431\u0456\u043A\u0456\u043D\u0456 (\u043F\u043E \u043B\u0456\u043D\u0456\u0457 \u0431\u0456\u043B\u0438\u0437\u043D\u0438). \u0420\u043E\u0437\u0448\u0438\u0440\u0435\u043D\u0438\u0439 \u0432\u0430\u0440\u0456\u0430\u043D\u0442 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0454\u0442\u044C\u0441\u044F \u043B\u0438\u0448\u0435 \u043F\u0456\u0441\u043B\u044F \u0442\u043E\u0433\u043E, \u044F\u043A \u043C\u0435\u043D\u0441\u0442\u0440\u0443\u0430\u043B\u044C\u043D\u0438\u0439 \u0446\u0438\u043A\u043B \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u043E \u0432\u0440\u0435\u0433\u0443\u043B\u044E\u0432\u0430\u0432\u0441\u044F \u0442\u0430 \u0441\u0442\u0430\u0431\u0456\u043B\u0456\u0437\u0443\u0432\u0430\u0432\u0441\u044F. \u0417\u0432\u0435\u0440\u043D\u0456\u0442\u044C \u0443\u0432\u0430\u0433\u0443, \u0449\u043E \u043C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0432\u0456\u043A \u0434\u043B\u044F \u043F\u043E\u0432\u043D\u043E\u0433\u043E \u0413\u043E\u043B\u043B\u0456\u0432\u0443\u0434\u0443 \u0430\u0431\u043E \u0411\u0440\u0430\u0437\u0438\u043B\u0456\u0439\u0441\u044C\u043A\u043E\u0433\u043E \u0431\u0456\u043A\u0456\u043D\u0456 \u2014 18 \u0440\u043E\u043A\u0456\u0432.",
      cat3Name: "\u0414\u043E\u0433\u043B\u044F\u0434 \u0442\u0430 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443",
      cat3Q1: "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457 \u0437 \u0434\u043E\u0433\u043B\u044F\u0434\u0443 \u043F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438",
      cat3A1: "\u0414\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F \u2014 \u0446\u0435 \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u0430 \u043C\u0456\u043A\u0440\u043E\u0442\u0440\u0430\u0432\u043C\u0430 \u0434\u043B\u044F \u0432\u043E\u043B\u043E\u0441\u044F\u043D\u0438\u0445 \u0444\u043E\u043B\u0456\u043A\u0443\u043B\u0456\u0432, \u0442\u043E\u043C\u0443 \u043A\u043E\u0436\u043D\u0430 \u0434\u0456\u044F \u043F\u0456\u0441\u043B\u044F \u0441\u0435\u0430\u043D\u0441\u0443 \u043D\u0430\u0434\u0437\u0432\u0438\u0447\u0430\u0439\u043D\u043E \u0432\u0430\u0436\u043B\u0438\u0432\u0430.\n\n\u0429\u043E\u0431 \u0432\u0430\u0448\u0430 \u0448\u043A\u0456\u0440\u0430 \u0437\u0430\u043B\u0438\u0448\u0430\u043B\u0430\u0441\u044F \u0433\u043B\u0430\u0434\u043A\u043E\u044E, \u0441\u043F\u043E\u043A\u0456\u0439\u043D\u043E\u044E \u0442\u0430 \u0437\u0434\u043E\u0440\u043E\u0432\u043E\u044E, \u0434\u043E\u0442\u0440\u0438\u043C\u0443\u0439\u0442\u0435\u0441\u044C \u0446\u0438\u0445 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0439 \u043F\u0440\u043E\u0442\u044F\u0433\u043E\u043C 48 \u0433\u043E\u0434\u0438\u043D \u043F\u0456\u0441\u043B\u044F \u043F\u0435\u0440\u0448\u043E\u0433\u043E \u0441\u0435\u0430\u043D\u0441\u0443 \u0430\u0431\u043E 24 \u0433\u043E\u0434\u0438\u043D \u0434\u043B\u044F \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u0438\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432 (\u0437\u0430\u043B\u0435\u0436\u043D\u043E \u0432\u0456\u0434 \u0447\u0430\u0441\u0443 \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0432\u0430\u0448\u043E\u0457 \u0448\u043A\u0456\u0440\u0438).\n\n\u0427\u043E\u0433\u043E \u0443\u043D\u0438\u043A\u0430\u0442\u0438 (\u043F\u0440\u043E\u0442\u044F\u0433\u043E\u043C 24\u201348 \u0433\u043E\u0434\u0438\u043D):\n\n\u2022 \u041F\u0440\u044F\u043C\u0435 \u0441\u043E\u043D\u044F\u0447\u043D\u0435 \u043F\u0440\u043E\u043C\u0456\u043D\u043D\u044F \u0442\u0430 \u0441\u043E\u043B\u044F\u0440\u0456\u0439: \u0423\u043D\u0438\u043A\u0430\u0439\u0442\u0435 \u0441\u043E\u043D\u044F\u0447\u043D\u043E\u0433\u043E \u043E\u043F\u0440\u043E\u043C\u0456\u043D\u0435\u043D\u043D\u044F \u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u0438\u0445 \u0437\u043E\u043D, \u043E\u0441\u043A\u0456\u043B\u044C\u043A\u0438 \u0441\u0432\u0456\u0436\u0430 \u0448\u043A\u0456\u0440\u0430 \u0434\u0443\u0436\u0435 \u0432\u0440\u0430\u0437\u043B\u0438\u0432\u0430 \u0434\u043E \u0443\u043B\u044C\u0442\u0440\u0430\u0444\u0456\u043E\u043B\u0435\u0442\u0443 \u0456 \u043C\u043E\u0436\u0435 \u0437'\u044F\u0432\u0438\u0442\u0438\u0441\u044F \u043D\u0435\u0440\u0456\u0432\u043D\u0430 \u043F\u0456\u0433\u043C\u0435\u043D\u0442\u0430\u0446\u0456\u044F. \u042F\u043A\u0449\u043E \u0441\u043E\u043D\u0446\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u0435 \u0456 \u0432\u0430\u043C \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0432\u0438\u0445\u043E\u0434\u0438\u0442\u0438 \u043D\u0430 \u0432\u0443\u043B\u0438\u0446\u044E \u2014 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u043D\u0430\u043D\u0435\u0441\u0456\u0442\u044C SPF 50.\n\n\u2022 \u0422\u0435\u043F\u043B\u043E \u0442\u0430 \u0442\u0435\u0440\u0442\u044F: \u0423\u043D\u0438\u043A\u0430\u0439\u0442\u0435 \u0441\u0430\u0443\u043D, \u043F\u0430\u0440\u043E\u0432\u0438\u0445 \u043A\u0456\u043C\u043D\u0430\u0442, \u0431\u0430\u0441\u0435\u0439\u043D\u0456\u0432, \u0433\u0430\u0440\u044F\u0447\u0438\u0445 \u0432\u0430\u043D\u043D, \u0456\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u0438\u0445 \u0442\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u044C \u0442\u0430 \u0441\u0435\u043A\u0441\u0443 \u2014 \u0442\u043E\u0431\u0442\u043E \u0432\u0441\u044C\u043E\u0433\u043E, \u0449\u043E \u0432\u0438\u043A\u043B\u0438\u043A\u0430\u0454 \u0441\u0438\u043B\u044C\u043D\u0435 \u043F\u043E\u0442\u043E\u0432\u0438\u0434\u0456\u043B\u0435\u043D\u043D\u044F \u0430\u0431\u043E \u0442\u0435\u0440\u0442\u044F \u043D\u0430 \u043D\u0456\u0436\u043D\u0456\u0439 \u0448\u043A\u0456\u0440\u0456.\n\n\u2022 \u0410\u0433\u0440\u0435\u0441\u0438\u0432\u043D\u0456 \u0437\u0430\u0441\u043E\u0431\u0438 \u0442\u0430 \u043C\u0438\u043B\u043E: \u041D\u0435 \u043D\u0430\u043D\u043E\u0441\u044C\u0442\u0435 \u043F\u0430\u0440\u0444\u0443\u043C\u043E\u0432\u0430\u043D\u0456 \u043B\u043E\u0441\u044C\u0439\u043E\u043D\u0438, \u0434\u0435\u0437\u043E\u0434\u043E\u0440\u0430\u043D\u0442\u0438, \u0430\u0432\u0442\u043E\u0437\u0430\u0441\u043C\u0430\u0433\u0443 \u0430\u0431\u043E \u0445\u0456\u043C\u0456\u0447\u043D\u0456 \u043F\u0456\u043B\u0456\u043D\u0433\u0438. \u0417\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0438 \u043C\u043E\u0436\u043D\u0430 \u043F\u0440\u0438\u0439\u043D\u044F\u0442\u0438 \u043B\u0435\u0433\u043A\u0438\u0439 \u0434\u0443\u0448 \u0437 \u0442\u0435\u043F\u043B\u043E\u044E \u0432\u043E\u0434\u043E\u044E \u043D\u0435 \u0440\u0430\u043D\u0456\u0448\u0435 \u043D\u0456\u0436 \u0447\u0435\u0440\u0435\u0437 4 \u0433\u043E\u0434\u0438\u043D\u0438 \u043F\u0456\u0441\u043B\u044F \u0441\u0435\u0430\u043D\u0441\u0443 (\u0449\u043E\u0431 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0456 \u0437\u0430\u0441\u043E\u0431\u0438 \u0434\u043E\u0433\u043B\u044F\u0434\u0443, \u044F\u043A\u0456 \u044F \u043D\u0430\u043D\u0435\u0441\u043B\u0430, \u0432\u0441\u0442\u0438\u0433\u043B\u0438 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u043F\u043E\u0434\u0456\u044F\u0442\u0438). \u041C\u0438\u0439\u0442\u0435 \u0437\u043E\u043D\u0443 \u043B\u0438\u0448\u0435 \u0432\u043E\u0434\u043E\u044E \u2014 \u0431\u0435\u0437 \u0433\u0435\u043B\u0456\u0432 \u0430\u0431\u043E \u043C\u0438\u043B\u0430.\n\n\u2022 \u0421\u0438\u043D\u0442\u0435\u0442\u0438\u043A\u0430 \u0442\u0430 \u0431\u0430\u043A\u0442\u0435\u0440\u0456\u0457: \u041C\u0456\u043D\u0456\u043C\u0456\u0437\u0443\u0439\u0442\u0435 \u0442\u043E\u0440\u043A\u0430\u043D\u043D\u044F \u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u043E\u0457 \u0437\u043E\u043D\u0438 \u0440\u0443\u043A\u0430\u043C\u0438 (\u044F\u043A\u0449\u043E \u043D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u2014 \u0440\u0443\u043A\u0438 \u043C\u0430\u044E\u0442\u044C \u0431\u0443\u0442\u0438 \u0447\u0438\u0441\u0442\u0456). \u041E\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0432\u0456\u043B\u044C\u043D\u0438\u0439 \u043E\u0434\u044F\u0433 \u0442\u0430 \u0431\u0456\u043B\u0438\u0437\u043D\u0443 \u0432\u0438\u043A\u043B\u044E\u0447\u043D\u043E \u0437 \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u0438\u0445 \u0442\u043A\u0430\u043D\u0438\u043D, \u044F\u043A-\u043E\u0442 \u0431\u0430\u0432\u043E\u0432\u043D\u0430.\n\n\u2022 \u0414\u043B\u044F \u0437\u043E\u043D \u043E\u0431\u043B\u0438\u0447\u0447\u044F: \u042F\u043A\u0449\u043E \u043C\u0438 \u0440\u043E\u0431\u0438\u043B\u0438 \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044E \u043E\u0431\u043B\u0438\u0447\u0447\u044F \u2014 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u0441\u043F\u043B\u044F\u0447\u0456\u0442\u044C \u043D\u0430 \u0441\u0432\u0456\u0436\u0456\u0439 \u0447\u0438\u0441\u0442\u0456\u0439 \u043D\u0430\u0432\u043E\u043B\u043E\u0447\u0446\u0456 \u0432 \u043D\u0456\u0447 \u043F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438.",
      cat3Q2: "\u0429\u043E \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0434\u043B\u044F \u0434\u043E\u0432\u0433\u043E\u0441\u0442\u0440\u043E\u043A\u043E\u0432\u043E\u0433\u043E \u0437\u0434\u043E\u0440\u043E\u0432'\u044F \u0448\u043A\u0456\u0440\u0438?",
      cat3A2: "\u041D\u0435 \u0441\u0435\u043A\u0440\u0435\u0442, \u0449\u043E \u0434\u043E\u043C\u0430\u0448\u043D\u0456\u0439 \u0434\u043E\u0433\u043B\u044F\u0434 \u0441\u043A\u043B\u0430\u0434\u0430\u0454 80% \u0442\u043E\u0433\u043E, \u044F\u043A \u0432\u0438\u0433\u043B\u044F\u0434\u0430\u0454 \u0442\u0430 \u0432\u0456\u0434\u0447\u0443\u0432\u0430\u0454\u0442\u044C\u0441\u044F \u0432\u0430\u0448\u0430 \u0448\u043A\u0456\u0440\u0430. \u0410\u0434\u0436\u0435 \u0432\u0438 \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0435 \u0437\u0456 \u043C\u043D\u043E\u044E \u043B\u0438\u0448\u0435 \u043E\u0434\u043D\u0443 \u0433\u043E\u0434\u0438\u043D\u0443 \u043D\u0430 \u043C\u0456\u0441\u044F\u0446\u044C, \u0430\u043B\u0435 \u0436\u0438\u0432\u0435\u0442\u0435 \u0437\u0456 \u0441\u0432\u043E\u0454\u044E \u0448\u043A\u0456\u0440\u043E\u044E \u043A\u043E\u0436\u0435\u043D \u0434\u0435\u043D\u044C.\n\n\u042F \u043D\u0430\u0434\u0430\u044E \u0432\u0438\u0447\u0435\u0440\u043F\u043D\u0456, \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0456 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0456 \u0432\u0430\u0448\u043E\u0433\u043E \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0443 \u0448\u043A\u0456\u0440\u0438 \u043F\u0456\u0434 \u0447\u0430\u0441 \u0437\u0430\u043F\u0438\u0441\u0443. \u042F \u0437\u0430\u0432\u0436\u0434\u0438 \u0433\u043E\u0442\u043E\u0432\u0430 \u043D\u0430\u0432\u0447\u0438\u0442\u0438 \u0432\u0430\u0441, \u044F\u043A\u0456 \u0437\u0430\u0441\u043E\u0431\u0438 \u043E\u0431\u0438\u0440\u0430\u0442\u0438 \u0442\u0430 \u0432 \u044F\u043A\u043E\u043C\u0443 \u043F\u043E\u0440\u044F\u0434\u043A\u0443 \u0457\u0445 \u0437\u0430\u0441\u0442\u043E\u0441\u043E\u0432\u0443\u0432\u0430\u0442\u0438, \u0449\u043E\u0431 \u0432\u0438 \u043C\u043E\u0433\u043B\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u043E \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0432\u0430\u0442\u0438 \u0437\u0434\u043E\u0440\u043E\u0432\u0443, \u0441\u044F\u044E\u0447\u0443 \u0448\u043A\u0456\u0440\u0443 \u043C\u0456\u0436 \u0432\u0456\u0434\u0432\u0456\u0434\u0443\u0432\u0430\u043D\u043D\u044F\u043C\u0438.",
      cat3Q3: "\u042F\u043A \u0447\u0430\u0441\u0442\u043E \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0437\u0430\u043F\u0438\u0441\u0443\u0432\u0430\u0442\u0438\u0441\u044F?",
      cat3A3: "\u042F\u043A \u043E\u0440\u0456\u0454\u043D\u0442\u0438\u0440, \u044F \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0438 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u043A\u043E\u0436\u043D\u0456 4\u20135 \u0442\u0438\u0436\u043D\u0456\u0432, \u0449\u043E\u0431 \u0434\u043E\u0441\u044F\u0433\u0442\u0438 \u043A\u0440\u0430\u0441\u0438\u0432\u043E\u0433\u043E \xAB\u043F\u0440\u0438\u0440\u043E\u0434\u043D\u043E\u0433\u043E \u0435\u0444\u0435\u043A\u0442\u0443 \u043B\u0430\u0437\u0435\u0440\u0430\xBB \u0442\u0430 \u0448\u0432\u0438\u0434\u043A\u043E \u0441\u043A\u043E\u0440\u043E\u0442\u0438\u0442\u0438 \u0440\u0456\u0441\u0442 \u0432\u043E\u043B\u043E\u0441\u0441\u044F.\n\n\u041F\u0440\u043E\u0442\u0435 \u043A\u043E\u0436\u0435\u043D \u043E\u0440\u0433\u0430\u043D\u0456\u0437\u043C \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0438\u0439. \u0426\u0438\u043A\u043B\u0438 \u0440\u043E\u0441\u0442\u0443 \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0437\u0430\u043B\u0435\u0436\u0430\u0442\u044C \u0432\u0456\u0434 \u0431\u0430\u0433\u0430\u0442\u044C\u043E\u0445 \u0432\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u0456\u0445 \u0444\u0430\u043A\u0442\u043E\u0440\u0456\u0432: \u0433\u043E\u0440\u043C\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0431\u0430\u043B\u0430\u043D\u0441\u0443, \u043C\u0435\u0434\u0438\u043A\u0430\u043C\u0435\u043D\u0442\u0456\u0432, \u043A\u043E\u043D\u0442\u0440\u0430\u0446\u0435\u043F\u0446\u0456\u0457, \u0432\u0430\u0433\u0456\u0442\u043D\u043E\u0441\u0442\u0456 \u0430\u0431\u043E \u0433\u0440\u0443\u0434\u043D\u043E\u0433\u043E \u0432\u0438\u0433\u043E\u0434\u043E\u0432\u0443\u0432\u0430\u043D\u043D\u044F \u2014 \u0432\u0441\u0435 \u0446\u0435 \u043C\u043E\u0436\u0435 \u0441\u043F\u043E\u0432\u0456\u043B\u044C\u043D\u044E\u0432\u0430\u0442\u0438 \u0440\u0456\u0441\u0442. \u0417\u0430\u043B\u0435\u0436\u043D\u043E \u0432\u0456\u0434 \u0437\u043E\u043D\u0438 \u0442\u0430 \u0440\u0438\u0442\u043C\u0443 \u0432\u0430\u0448\u043E\u0433\u043E \u043E\u0440\u0433\u0430\u043D\u0456\u0437\u043C\u0443, \u0456\u043D\u0442\u0435\u0440\u0432\u0430\u043B\u0438 \u043C\u043E\u0436\u0443\u0442\u044C \u0431\u0443\u0442\u0438 \u0439 \u0434\u043E\u0432\u0448\u0438\u043C\u0438 \u2014 \u0431\u043B\u0438\u0437\u044C\u043A\u043E 6\u20138 \u0442\u0438\u0436\u043D\u0456\u0432. \u042F \u0437\u0430\u0432\u0436\u0434\u0438 \u0433\u043E\u0442\u043E\u0432\u0430 \u043F\u0456\u0434\u043A\u0430\u0437\u0430\u0442\u0438 \u0442\u0430 \u0441\u043A\u043B\u0430\u0441\u0442\u0438 \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0438\u0439 \u0433\u0440\u0430\u0444\u0456\u043A, \u0449\u043E\u0431 \u0432\u0438 \u043E\u0442\u0440\u0438\u043C\u0430\u043B\u0438 \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0438\u0439 \u0442\u0430 \u043D\u0430\u0439\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442."
    },
    contact: {
      eyebrow: "\u0417\u0432'\u044F\u0436\u0456\u0442\u044C\u0441\u044F \u0437\u0456 \u043C\u043D\u043E\u044E",
      heading: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F \u043D\u0430 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0443",
      subtext: "\u0413\u043E\u0442\u043E\u0432\u0456 \u0432\u0456\u0434\u0447\u0443\u0442\u0438 \u0440\u043E\u0437\u043A\u0456\u0448 \u043F\u0440\u0435\u043C\u0456\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443? \u0417\u0432'\u044F\u0436\u0456\u0442\u044C\u0441\u044F \u0437\u0456 \u043C\u043D\u043E\u044E \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0443 \u0430\u0431\u043E \u044F\u043A\u0449\u043E \u043C\u0430\u0454\u0442\u0435 \u0437\u0430\u043F\u0438\u0442\u0430\u043D\u043D\u044F.",
      locationLabel: "\u0420\u043E\u0437\u0442\u0430\u0448\u0443\u0432\u0430\u043D\u043D\u044F",
      locationValue: "\u0411\u0440\u0456\u0441\u0442\u043E\u043B\u044C, \u0410\u043D\u0433\u043B\u0456\u044F",
      locationNote: "\u0422\u043E\u0447\u043D\u0430 \u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430\u0434\u0430\u0454\u0442\u044C\u0441\u044F \u043F\u0456\u0441\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0443",
      emailLabel: "\u0415\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430 \u043F\u043E\u0448\u0442\u0430",
      availabilityLabel: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u0456\u0441\u0442\u044C",
      availabilityValue: "\u041B\u0438\u0448\u0435 \u0437\u0430 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u043C \u0437\u0430\u043F\u0438\u0441\u043E\u043C",
      availabilityNote: "\u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043D\u0430\u043F\u0438\u0448\u0456\u0442\u044C \u043C\u0435\u043D\u0456 \u0434\u043B\u044F \u0443\u0437\u0433\u043E\u0434\u0436\u0435\u043D\u043D\u044F \u0437\u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0447\u0430\u0441\u0443",
      formTitle: "\u041D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F",
      nameLabel: "\u0412\u0430\u0448\u0435 \u0456\u043C'\u044F",
      namePlaceholder: "\u0410\u043B\u0456\u043D\u0430 \u041C\u0435\u043B\u044C\u043D\u0438\u043A",
      emailFormLabel: "\u0415\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430 \u043F\u043E\u0448\u0442\u0430",
      emailPlaceholder: "alina@example.com",
      serviceLabel: "\u041F\u043E\u0441\u043B\u0443\u0433\u0430, \u0449\u043E \u0446\u0456\u043A\u0430\u0432\u0438\u0442\u044C",
      serviceDefault: "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u043E\u0441\u043B\u0443\u0433\u0443...",
      optgroupBikini: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0431\u0456\u043A\u0456\u043D\u0456 \u0442\u0430 \u0456\u043D\u0442\u0438\u043C\u043D\u043E\u0457 \u0437\u043E\u043D\u0438",
      optionHollywood: "\u0413\u043E\u043B\u043B\u0456\u0432\u0443\u0434 / \u0411\u0440\u0430\u0437\u0438\u043B\u0456\u0439\u0441\u044C\u043A\u0435 \u0431\u0456\u043A\u0456\u043D\u0456",
      optionGstring: "G-String / \u0420\u043E\u0437\u0448\u0438\u0440\u0435\u043D\u0435 \u0431\u0456\u043A\u0456\u043D\u0456",
      optionBasicBikini: "\u041A\u043B\u0430\u0441\u0438\u0447\u043D\u0435 \u0431\u0456\u043A\u0456\u043D\u0456",
      optgroupUpper: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0432\u0435\u0440\u0445\u043D\u044C\u043E\u0457 \u0447\u0430\u0441\u0442\u0438\u043D\u0438 \u0442\u0456\u043B\u0430",
      optionUnderarms: "\u041F\u0430\u0445\u0432\u0438",
      optionArms: "\u0420\u0443\u043A\u0438 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0430\u0431\u043E \u0434\u043E \u043B\u0456\u043A\u0442\u044F",
      optionStomach: "\u0416\u0438\u0432\u0456\u0442",
      optgroupDown: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043D\u0438\u0436\u043D\u044C\u043E\u0457 \u0447\u0430\u0441\u0442\u0438\u043D\u0438 \u0442\u0456\u043B\u0430",
      optionLegs: "\u041D\u043E\u0433\u0438 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u0430\u0431\u043E \u0447\u0430\u0441\u0442\u043A\u043E\u0432\u043E",
      optionButtocks: "\u0421\u0456\u0434\u043D\u0438\u0446\u0456 \u0442\u0430 \u043F\u043E\u043F\u0435\u0440\u0435\u043A",
      optgroupFace: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u043E\u0431\u043B\u0438\u0447\u0447\u044F",
      optionFaceZones: "\u041E\u043A\u0440\u0435\u043C\u0456 \u0437\u043E\u043D\u0438 \u043E\u0431\u043B\u0438\u0447\u0447\u044F",
      optionFaceCombos: "\u041A\u043E\u043C\u0431\u043E \u0442\u0430 \u043F\u0440\u0435\u043C\u0456\u0443\u043C-\u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0438",
      optgroupCourses: "\u041A\u0443\u0440\u0441\u0438 \u0442\u0430 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F",
      optionCoursePro: "\u041A\u0443\u0440\u0441: \u0434\u043B\u044F \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u0456\u0432",
      optionCourseSelf: "\u041A\u0443\u0440\u0441: \u0434\u043B\u044F \u0441\u0435\u0431\u0435",
      optionCourseOnline: "\u041E\u043D\u043B\u0430\u0439\u043D-\u043A\u0443\u0440\u0441",
      optgroupOther: "\u0406\u043D\u0448\u0435",
      optionMultiZone: "\u041A\u0456\u043B\u044C\u043A\u0430 \u0437\u043E\u043D / \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u0438\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441",
      optionOther: "\u0406\u043D\u0448\u0435 / \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0435 \u0437\u0430\u043F\u0438\u0442\u0430\u043D\u043D\u044F",
      messageLabel: "\u0412\u0430\u0448\u0435 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F",
      messagePlaceholder: "\u0420\u043E\u0437\u043A\u0430\u0436\u0456\u0442\u044C \u043F\u0440\u043E \u0441\u0432\u043E\u044E \u0448\u043A\u0456\u0440\u0443 \u0430\u0431\u043E \u043F\u043E\u0441\u0442\u0430\u0432\u0442\u0435 \u0437\u0430\u043F\u0438\u0442\u0430\u043D\u043D\u044F...",
      submitButton: "\u041D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438"
    },
    blog: {
      eyebrow: "\u0416\u0443\u0440\u043D\u0430\u043B",
      heading: "\u041A\u0440\u0430\u0441\u0430 \u0437\u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0438",
      post1Title: "\u0429\u043E \u0442\u0430\u043A\u0435 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0456 \u0447\u043E\u043C\u0443 \u0441\u0430\u043C\u0435 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433?",
      post1Excerpt: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u2014 \u0446\u0435 100% \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u0438\u0439 \u0442\u0430 \u043E\u0440\u0433\u0430\u043D\u0456\u0447\u043D\u0438\u0439 \u043C\u0435\u0442\u043E\u0434 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0432\u043E\u043B\u043E\u0441\u0441\u044F \u0446\u0443\u043A\u0440\u043E\u0432\u043E\u044E \u043F\u0430\u0441\u0442\u043E\u044E. \u0414\u043B\u044F \u043C\u0435\u043D\u0435 \u0446\u0435 \u043D\u0430\u0431\u0430\u0433\u0430\u0442\u043E \u0431\u0456\u043B\u044C\u0448\u0435, \u043D\u0456\u0436 \u043F\u0440\u043E\u0441\u0442\u043E \u0434\u0435\u043F\u0456\u043B\u044F\u0446\u0456\u044F \u2014 \u0446\u0435 \u0440\u043E\u0437\u043A\u0456\u0448\u043D\u0438\u0439 \u0441\u043F\u0430-\u0440\u0438\u0442\u0443\u0430\u043B \u0442\u0443\u0440\u0431\u043E\u0442\u0438 \u043F\u0440\u043E \u0441\u0435\u0431\u0435.",
      post1Tag: "\u041D\u0430\u0432\u0447\u0430\u043D\u043D\u044F",
      post2Title: "\u0428\u0443\u0433\u0430\u0440\u0438\u043D\u0433 \u0440\u0443\u043A \u2014 \u0443 \u0442\u0440\u0435\u043D\u0434\u0456!",
      post2Excerpt: "\u0407\u0457 \u0437\u0430\u043F\u0438\u0442\u0443\u044E\u0442\u044C \u0442\u0430\u043A \u0441\u0430\u043C\u043E \u0447\u0430\u0441\u0442\u043E, \u044F\u043A \u0456 \u0437\u043E\u043D\u0443 \u0431\u0456\u043A\u0456\u043D\u0456. \u0412\u0456\u0434\u0447\u0443\u0442\u0442\u044F \u043F\u0456\u0441\u043B\u044F \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440\u0438 \u2014 \u043D\u0435\u043F\u0435\u0440\u0435\u0432\u0435\u0440\u0448\u0435\u043D\u0435: \u043B\u0435\u0433\u043A\u0456\u0441\u0442\u044C, \u0448\u043E\u0432\u043A\u043E\u0432\u0438\u0441\u0442\u0456\u0441\u0442\u044C \u0456 \u0436\u0456\u043D\u043E\u0447\u043D\u0456\u0441\u0442\u044C \u0430\u0436 \u0434\u043E \u043A\u0456\u043D\u0447\u0438\u043A\u0456\u0432 \u043F\u0430\u043B\u044C\u0446\u0456\u0432.",
      post2Tag: "\u0422\u0440\u0435\u043D\u0434\u0438",
      readMore: "\u0427\u0438\u0442\u0430\u0442\u0438 \u0434\u0430\u043B\u0456"
    },
    footer: {
      brandTagline: "\u0417 \u043B\u044E\u0431\u043E\u0432'\u044E \u0434\u043E \u0432\u0430\u0448\u043E\u0457 \u0448\u043A\u0456\u0440\u0438. \u041F\u0440\u0435\u043C\u0456\u0430\u043B\u044C\u043D\u0430 \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u043A\u0430 \u0437 \u0448\u0443\u0433\u0430\u0440\u0438\u043D\u0433\u0443 \u2014 \u0440\u043E\u0437\u043A\u0456\u0448\u043D\u0438\u0439 \u0434\u043E\u0433\u043B\u044F\u0434 \u0437\u0430 \u0441\u043E\u0431\u043E\u044E \u0443 \u0411\u0440\u0456\u0441\u0442\u043E\u043B\u0456.",
      emailButton: "Email",
      navGroupExplore: "\u041D\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u044F",
      navAbout: "\u041F\u0440\u043E \u043C\u0435\u043D\u0435",
      navServices: "\u041F\u043E\u0441\u043B\u0443\u0433\u0438 \u0442\u0430 \u0446\u0456\u043D\u0438",
      navCourses: "\u041A\u0443\u0440\u0441\u0438",
      navGroupSupport: "\u041F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430",
      navFaq: "FAQ",
      navCareGuide: "\u0413\u0456\u0434 \u0437 \u0434\u043E\u0433\u043B\u044F\u0434\u0443",
      navContact: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438",
      madeWithLove: "\u0417\u0440\u043E\u0431\u043B\u0435\u043D\u043E \u0437",
      madeWithLoveCity: "\u0443 \u0411\u0440\u0456\u0441\u0442\u043E\u043B\u0456"
    },
    sticky: {
      bookNow: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F"
    }
  }
};
var translations_default = translations;

// src/components/ServicesData.jsx
var getServicesData = (t) => ({
  inclusions: [
    { title: t.inclusion1Title, desc: t.inclusion1Desc },
    { title: t.inclusion2Title, desc: t.inclusion2Desc },
    { title: t.inclusion3Title, desc: t.inclusion3Desc }
  ],
  durationNotes: [
    { title: t.durationNote1Title, desc: t.durationNote1Desc },
    { title: t.durationNote2Title, desc: t.durationNote2Desc },
    { title: t.durationNote3Title, desc: t.durationNote3Desc },
    { title: t.durationNote4Title, desc: t.durationNote4Desc },
    { title: t.durationNote5Title, desc: t.durationNote5Desc },
    { title: t.durationNote6Title, desc: t.durationNote6Desc }
  ],
  categories: [
    {
      id: "bikini",
      label: t.tabBikini,
      fullLabel: t.bikiniFullLabel,
      Icon: Heart,
      beforeImage: null,
      afterImage: null,
      tagline: t.bikiniTagline,
      groups: [
        {
          groupName: null,
          items: [
            { name: t.bikiniService1Name, price: "\xA345", badge: t.bikiniService1Badge, duration: t.bikiniService1Duration, desc: t.bikiniService1Desc, image: "/price-list/bikini/hollywood-bikini.jpeg" },
            { name: t.bikiniService2Name, price: "\xA345", duration: t.bikiniService2Duration, desc: t.bikiniService2Desc, image: "/price-list/bikini/brazilian-bikini.jpeg" },
            { name: t.bikiniService3Name, price: "\xA335", duration: t.bikiniService3Duration, desc: t.bikiniService3Desc, image: "/price-list/bikini/g-string-bikini.jpeg" },
            { name: t.bikiniService4Name, price: "\xA325", duration: t.bikiniService4Duration, desc: t.bikiniService4Desc, image: "/price-list/bikini/basic-bikini.jpg" }
          ]
        },
        {
          groupName: t.bikiniAddonGroupName,
          isAddOn: true,
          items: [
            { name: t.bikiniAddon1Name, price: "+\xA35 to \xA320", desc: t.bikiniAddon1Desc, extendedDesc: t.bikiniAddon1ExtendedDesc, isAddOn: true, placeholderLabel: "Extra Long Hair Graphic" },
            { name: t.bikiniAddon2Name, price: "\xA35", desc: t.bikiniAddon2Desc, extendedDesc: t.bikiniAddon2ExtendedDesc, isAddOn: true, placeholderLabel: "Extra Patch Graphic" },
            { name: t.bikiniAddon3Name, price: "\xA35", desc: t.bikiniAddon3Desc, isAddOn: true, placeholderLabel: "Belly Line Graphic" }
          ]
        }
      ]
    },
    {
      id: "upper",
      label: t.tabUpper,
      fullLabel: t.upperFullLabel,
      Icon: Sparkles,
      beforeImage: null,
      afterImage: null,
      tagline: t.upperTagline,
      groups: [
        {
          groupName: null,
          items: [
            { name: t.upperService1Name, price: "\xA320", duration: t.upperService1Duration, desc: t.upperService1Desc, placeholderLabel: "Underarms Graphic" },
            { name: t.upperService2Name, price: "\xA350", duration: t.upperService2Duration, desc: t.upperService2Desc, placeholderLabel: "Full Arms Graphic" },
            { name: t.upperService3Name, price: "\xA340", duration: t.upperService3Duration, desc: t.upperService3Desc, placeholderLabel: "Half Arms Graphic" },
            { name: t.upperService4Name, price: "\xA330", duration: t.upperService4Duration, desc: t.upperService4Desc, placeholderLabel: "Stomach Graphic" }
          ]
        },
        {
          groupName: t.bikiniAddonGroupName,
          isAddOn: true,
          items: [
            { name: t.upperAddon1Name, price: "\xA35", duration: t.upperAddon1Duration, desc: t.upperAddon1Desc, isAddOn: true, placeholderLabel: "Nipple Area Graphic" },
            { name: t.upperAddon2Name, price: "\xA310", duration: t.upperAddon2Duration, desc: t.upperAddon2Desc, isAddOn: true, placeholderLabel: "Fingers Graphic" }
          ]
        }
      ]
    },
    {
      id: "down",
      label: t.tabDown,
      fullLabel: t.downFullLabel,
      Icon: ArrowDown,
      beforeImage: null,
      afterImage: null,
      tagline: t.downTagline,
      groups: [
        {
          groupName: null,
          items: [
            { name: t.downService1Name, price: "\xA360", duration: t.downService1Duration, desc: t.downService1Desc, placeholderLabel: "Full Legs Graphic" },
            { name: t.downService2Name, price: "\xA340", duration: t.downService2Duration, desc: t.downService2Desc, placeholderLabel: "Half Legs Graphic" },
            { name: t.downService3Name, price: "\xA325", duration: t.downService3Duration, desc: t.downService3Desc, placeholderLabel: "Buttocks Graphic" },
            { name: t.downService4Name, price: "\xA325", duration: t.downService4Duration, desc: t.downService4Desc, placeholderLabel: "Lower Back Graphic" },
            { name: t.downService5Name, price: "\xA340", badge: t.downService5Badge, duration: t.downService5Duration, desc: t.downService5Desc, placeholderLabel: "Lower Back & Buttocks Graphic" }
          ]
        },
        {
          groupName: t.bikiniAddonGroupName,
          isAddOn: true,
          items: [
            { name: t.downAddon1Name, price: "\xA310", duration: t.downAddon1Duration, desc: t.downAddon1Desc, isAddOn: true, placeholderLabel: "Toes Graphic" }
          ]
        }
      ]
    },
    {
      id: "face",
      label: t.tabFace,
      fullLabel: t.faceFullLabel,
      Icon: Smile,
      beforeImage: null,
      afterImage: null,
      tagline: t.faceTagline,
      groups: [
        {
          groupName: t.faceGroupIndividual,
          items: [
            { name: t.faceService1Name, price: "\xA315", duration: t.faceService1Duration, desc: t.faceService1Desc, placeholderLabel: "Upper Lip Graphic" },
            { name: t.faceService2Name, price: "\xA315", duration: t.faceService2Duration, desc: t.faceService2Desc, placeholderLabel: "Chin Graphic" },
            { name: t.faceService3Name, price: "\xA320", duration: t.faceService3Duration, desc: t.faceService3Desc, placeholderLabel: "Nose Pores Graphic" },
            { name: t.faceService4Name, price: "\xA315", duration: t.faceService4Duration, desc: t.faceService4Desc, placeholderLabel: "Nostrils Graphic" },
            { name: t.faceService5Name, price: "\xA330", duration: t.faceService5Duration, desc: t.faceService5Desc, placeholderLabel: "Eyebrows Graphic" },
            { name: t.faceService6Name, price: "\xA320", duration: t.faceService6Duration, desc: t.faceService6Desc, placeholderLabel: "Sideburns Graphic" },
            { name: t.faceService7Name, price: "\xA315", duration: t.faceService7Duration, desc: t.faceService7Desc, placeholderLabel: "Neck Graphic" },
            { name: t.faceService8Name, price: "\xA315", duration: t.faceService8Duration, desc: t.faceService8Desc, placeholderLabel: "Nape Area Graphic" }
          ]
        },
        {
          groupName: t.faceGroupCombos,
          isPackages: true,
          items: [
            { name: t.faceCombo1Name, price: "\xA330", duration: t.faceCombo1Duration, badge: t.faceCombo1Badge, desc: t.faceCombo1Desc, placeholderLabel: "Lower Face Care Graphic" },
            { name: t.faceCombo2Name, price: "\xA330", duration: t.faceCombo2Duration, desc: t.faceCombo2Desc, placeholderLabel: "Complete Nose Care Graphic" },
            { name: t.faceCombo3Name, price: "\xA340", duration: t.faceCombo3Duration, desc: t.faceCombo3Desc, placeholderLabel: "T-Zone Treatment Graphic" },
            { name: t.faceCombo4Name, price: "\xA340", duration: t.faceCombo4Duration, badge: t.faceCombo4Badge, desc: t.faceCombo4Desc, placeholderLabel: "Perfect Facial Contour Graphic" }
          ]
        },
        {
          groupName: t.faceGroupPremium,
          isPackages: true,
          isPremium: true,
          items: [
            { name: t.facePremium1Name, price: "\xA370", duration: t.facePremium1Duration, desc: t.facePremium1Desc, placeholderLabel: "Full Facial Care Graphic" },
            { name: t.facePremium2Name, price: "\xA380", duration: t.facePremium2Duration, desc: t.facePremium2Desc, placeholderLabel: "Ultimate Refresh Graphic" },
            { name: t.facePremium3Name, price: "\xA380", duration: t.facePremium3Duration, desc: t.facePremium3Desc, placeholderLabel: "Royal Smoothness Graphic" }
          ]
        }
      ]
    }
  ]
});

// src/components/ServicesSection.jsx
import { Fragment as Fragment4, jsx as jsx7, jsxs as jsxs2 } from "react/jsx-runtime";
function ServiceCard({ item, index, isPremium }) {
  const isPopular = item.badge === "Most Popular";
  const isPackage = item.badge && !isPopular && !isPremium;
  return /* @__PURE__ */ jsxs2(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.05 },
      className: `group relative border rounded-sm transition-all duration-500 hover:shadow-lg flex flex-col ${isPremium ? "bg-primary/10 border-primary/40 shadow-md hover:border-primary/60 hover:shadow-lg" : isPopular ? "bg-background border-primary/50 shadow-sm" : isPackage ? "border-primary/30 bg-primary/5" : "bg-background border-border/50 hover:border-primary/30"}`,
      children: [
        item.badge && /* @__PURE__ */ jsxs2("div", { className: `absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm flex items-center gap-1 z-20 shadow-sm whitespace-nowrap bg-primary text-primary-foreground`, children: [
          isPopular && /* @__PURE__ */ jsx7(Star, { className: "w-3 h-3 fill-current" }),
          item.badge
        ] }),
        item.image ? /* @__PURE__ */ jsx7("div", { className: "w-full aspect-[16/9] border-b border-border/30 shrink-0 relative overflow-hidden rounded-t-sm", children: /* @__PURE__ */ jsx7("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105", loading: "lazy" }) }) : item.placeholderLabel ? /* @__PURE__ */ jsx7("div", { className: "w-full aspect-[16/9] bg-gradient-to-br from-secondary/50 via-accent/35 to-secondary/50 flex items-center justify-center border-b border-border/30 shrink-0 relative overflow-hidden rounded-t-sm", children: /* @__PURE__ */ jsxs2("span", { className: "text-[10px] tracking-[0.12em] uppercase text-muted-foreground/60 font-body px-4 text-center", children: [
          "\u{1F4F8} ",
          item.placeholderLabel
        ] }) }) : null,
        /* @__PURE__ */ jsxs2("div", { className: "p-6 lg:p-8 flex flex-col flex-1 relative", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex justify-between items-start mb-4 mt-2", children: [
            /* @__PURE__ */ jsx7("h4", { className: `font-display text-xl font-semibold pr-4 leading-tight text-foreground`, children: item.name }),
            /* @__PURE__ */ jsx7("span", { className: `font-display text-2xl font-semibold whitespace-nowrap font-medium text-primary`, children: item.price })
          ] }),
          item.duration && /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx7(Clock, { className: `w-3.5 h-3.5 text-muted-foreground/60` }),
            /* @__PURE__ */ jsx7("span", { className: `text-sm font-body tracking-wide text-muted-foreground`, children: item.duration })
          ] }),
          item.desc && /* @__PURE__ */ jsx7("p", { className: `text-sm leading-relaxed whitespace-pre-line font-body mt-2 text-muted-foreground`, children: item.desc })
        ] })
      ]
    }
  );
}
function AddOnCard({ item, index }) {
  const [isExpanded, setIsExpanded] = useState3(false);
  return /* @__PURE__ */ jsx7(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: index * 0.04 },
      className: "group relative bg-background/40 hover:bg-background border border-dashed border-border/60 hover:border-primary/40 rounded-sm p-5 transition-all duration-300 flex flex-col justify-between",
      style: isExpanded ? { zIndex: 50 } : { zIndex: 1 },
      children: /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex justify-between items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex items-start gap-1.5", children: [
            /* @__PURE__ */ jsx7("span", { className: "text-primary font-semibold text-sm leading-none shrink-0 mt-0.5", children: "+" }),
            /* @__PURE__ */ jsxs2(
              "div",
              {
                className: "flex items-center gap-2 cursor-pointer relative",
                onMouseEnter: () => setIsExpanded(true),
                onMouseLeave: () => setIsExpanded(false),
                onClick: () => setIsExpanded(!isExpanded),
                children: [
                  /* @__PURE__ */ jsx7("h5", { className: "font-display text-[17px] font-semibold text-foreground leading-tight group-hover:text-primary transition-colors", children: item.name }),
                  item.extendedDesc && /* @__PURE__ */ jsx7(Info, { className: `w-4 h-4 transition-colors shrink-0 ${isExpanded ? "text-primary" : "text-muted-foreground/60 group-hover:text-primary"}` }),
                  item.extendedDesc && /* @__PURE__ */ jsx7(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsx7(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -5, scale: 0.98 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, y: -5, scale: 0.98 },
                      transition: { duration: 0.2 },
                      className: "absolute left-0 top-[calc(100%+0.75rem)] w-[calc(100vw-3rem)] max-w-sm sm:max-w-md z-50 p-5 bg-background text-foreground border border-border shadow-2xl rounded-md text-sm leading-relaxed font-body whitespace-pre-line pointer-events-none",
                      style: { zIndex: 100 },
                      children: item.extendedDesc
                    }
                  ) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx7("span", { className: "font-display text-lg font-semibold text-primary shrink-0 leading-none", children: item.price })
        ] }),
        item.image && /* @__PURE__ */ jsx7("div", { className: "w-full h-16 rounded-sm overflow-hidden mb-3 border border-border/30", children: /* @__PURE__ */ jsx7("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover", loading: "lazy" }) }),
        item.desc && /* @__PURE__ */ jsx7("p", { className: "text-sm text-muted-foreground leading-relaxed font-body mt-1.5 whitespace-pre-line", children: item.desc })
      ] })
    }
  );
}
function FaceCareGuide() {
  const { lang } = useLang();
  const t = translations_default[lang].services;
  const [isOpen, setIsOpen] = useState3(false);
  return /* @__PURE__ */ jsxs2(
    motion.div,
    {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.2 },
      className: "mt-8",
      children: [
        /* @__PURE__ */ jsxs2(
          "button",
          {
            onClick: () => setIsOpen((o) => !o),
            className: "w-full flex items-center justify-between px-6 py-4 bg-background border border-border/40 rounded-sm hover:border-primary/30 transition-colors text-left",
            children: [
              /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx7(CircleAlert, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsx7("p", { className: "text-xs tracking-[0.2em] uppercase text-primary font-medium font-body", children: t.faceCareGuideToggle })
              ] }),
              /* @__PURE__ */ jsx7(ChevronDown, { className: `w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}` })
            ]
          }
        ),
        /* @__PURE__ */ jsx7(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx7(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxs2("div", { className: "bg-background border border-t-0 border-border/40 rounded-b-sm p-6 md:p-8 space-y-10 text-[15px] font-body leading-relaxed text-muted-foreground", children: [
              /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx7("p", { children: t.faceGuideIntro1 }),
                /* @__PURE__ */ jsx7("p", { children: t.faceGuideIntro2 }),
                /* @__PURE__ */ jsx7("p", { children: t.faceGuideIntro3 })
              ] }),
              /* @__PURE__ */ jsxs2("div", { children: [
                /* @__PURE__ */ jsx7("h5", { className: "text-base font-semibold text-foreground mb-4 flex items-center gap-2", children: t.faceGuideSection1Heading }),
                /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx7("p", { children: t.faceGuideSection1Para1 }),
                  /* @__PURE__ */ jsxs2("ul", { className: "space-y-3 pl-2 list-none", children: [
                    /* @__PURE__ */ jsx7("li", { className: "relative before:content-[''] before:absolute before:-left-5 before:w-1.5 before:h-1.5 before:bg-foreground before:rounded-full before:top-2 ml-5", children: t.faceGuideSection1Bullet1 }),
                    /* @__PURE__ */ jsx7("li", { className: "relative before:content-[''] before:absolute before:-left-5 before:w-1.5 before:h-1.5 before:bg-foreground before:rounded-full before:top-2 ml-5", children: t.faceGuideSection1Bullet2 })
                  ] }),
                  /* @__PURE__ */ jsx7("p", { children: t.faceGuideSection1Para2 }),
                  /* @__PURE__ */ jsx7("blockquote", { className: "border-l-2 border-primary/40 pl-4 py-1 my-6 italic text-foreground/80 bg-primary/5 rounded-r-sm p-4", children: t.faceGuideSection1Quote })
                ] })
              ] }),
              /* @__PURE__ */ jsxs2("div", { children: [
                /* @__PURE__ */ jsx7("h5", { className: "text-base font-semibold text-foreground mb-5 flex items-center gap-2", children: t.faceGuideSection2Heading }),
                /* @__PURE__ */ jsxs2("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxs2("p", { children: [
                      /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideItem1Strong }),
                      " ",
                      t.faceGuideItem1Text
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxs2("p", { children: [
                      /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideItem2Strong }),
                      " ",
                      t.faceGuideItem2Text
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxs2("p", { children: [
                      /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideItem3Strong }),
                      " ",
                      t.faceGuideItem3Text
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxs2("p", { children: [
                      /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideItem4Strong }),
                      " ",
                      t.faceGuideItem4Text
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxs2("p", { children: [
                      /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideItem5Strong }),
                      " ",
                      t.faceGuideItem5Text
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs2("div", { className: "mt-6 bg-secondary/50 rounded-sm p-4 text-primary font-medium flex items-start gap-3", children: [
                    /* @__PURE__ */ jsx7("span", { className: "text-lg leading-none mt-0.5", children: "\u{1F4AC}" }),
                    /* @__PURE__ */ jsx7("p", { children: t.faceGuideSendPhotoNote })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs2("div", { children: [
                /* @__PURE__ */ jsx7("h5", { className: "text-base font-semibold text-foreground mb-4 flex items-center gap-2", children: t.faceGuideSection3Heading }),
                /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx7("p", { children: t.faceGuideSection3Intro }),
                  /* @__PURE__ */ jsxs2("div", { className: "grid sm:grid-cols-2 gap-5 mt-6", children: [
                    /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxs2("p", { children: [
                        /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideAftercare1Strong }),
                        " ",
                        t.faceGuideAftercare1Text
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxs2("p", { children: [
                        /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideAftercare2Strong }),
                        " ",
                        t.faceGuideAftercare2Text
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxs2("p", { children: [
                        /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideAftercare3Strong }),
                        " ",
                        t.faceGuideAftercare3Text
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxs2("p", { children: [
                        /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideAftercare4Strong }),
                        " ",
                        t.faceGuideAftercare4Text
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxs2("p", { children: [
                        /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideAftercare5Strong }),
                        " ",
                        t.faceGuideAftercare5Text
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsx7(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxs2("p", { children: [
                        /* @__PURE__ */ jsx7("strong", { className: "text-foreground font-medium", children: t.faceGuideAftercare6Strong }),
                        " ",
                        t.faceGuideAftercare6Text
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs2("div", { className: "mt-8 space-y-4", children: [
                    /* @__PURE__ */ jsx7("p", { className: "italic border-l-2 border-primary/40 pl-4 py-1 text-foreground/80", children: t.faceGuideClosingNote }),
                    /* @__PURE__ */ jsxs2("div", { className: "bg-primary text-primary-foreground rounded-sm p-4 font-medium flex items-start gap-3", children: [
                      /* @__PURE__ */ jsx7("span", { className: "text-lg leading-none mt-0.5", children: "\u{1F4AC}" }),
                      /* @__PURE__ */ jsx7("p", { children: t.faceGuideClosingCta })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ) })
      ]
    }
  );
}
function MobileFlashcards({ items, isPremium }) {
  const [[current, direction], setPage] = useState3([0, 0]);
  const total = items.length;
  const paginate = (dir) => {
    setPage(([prev]) => [
      (prev + dir + total) % total,
      dir
    ]);
  };
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 })
  };
  return /* @__PURE__ */ jsxs2("div", { className: "md:hidden", children: [
    /* @__PURE__ */ jsx7("div", { className: "relative overflow-hidden pt-5", children: /* @__PURE__ */ jsx7(AnimatePresence, { initial: false, custom: direction, mode: "wait", children: /* @__PURE__ */ jsx7(
      motion.div,
      {
        custom: direction,
        variants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: { type: "tween", duration: 0.35, ease: "easeInOut" },
        children: /* @__PURE__ */ jsx7(ServiceCard, { item: items[current], index: current, isPremium })
      },
      current
    ) }) }),
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between mt-5 px-1", children: [
      /* @__PURE__ */ jsx7(
        "button",
        {
          onClick: () => paginate(-1),
          className: "w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary transition-all active:scale-95",
          "aria-label": "Previous",
          children: /* @__PURE__ */ jsx7("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx7("path", { d: "M10 12L6 8L10 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
        }
      ),
      /* @__PURE__ */ jsx7("div", { className: "flex items-center gap-2", children: items.map((_, i) => /* @__PURE__ */ jsx7(
        "button",
        {
          onClick: () => setPage([i, i > current ? 1 : -1]),
          className: `rounded-full transition-all duration-300 ${i === current ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-border hover:bg-primary/50"}`,
          "aria-label": `Go to card ${i + 1}`
        },
        i
      )) }),
      /* @__PURE__ */ jsx7(
        "button",
        {
          onClick: () => paginate(1),
          className: "w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary transition-all active:scale-95",
          "aria-label": "Next",
          children: /* @__PURE__ */ jsx7("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx7("path", { d: "M6 4L10 8L6 12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs2("p", { className: "text-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 mt-3 font-body", children: [
      current + 1,
      " / ",
      total
    ] })
  ] });
}
function ServicesSection() {
  const { lang } = useLang();
  const t = translations_default[lang].services;
  const { inclusions, durationNotes, categories } = getServicesData(t);
  const [activeTab, setActiveTab] = useState3("bikini");
  const [notesOpen, setNotesOpen] = useState3(false);
  const active = categories.find((c) => c.id === activeTab);
  return /* @__PURE__ */ jsx7("section", { id: "services", className: "py-16 lg:py-32 bg-secondary/30", children: /* @__PURE__ */ jsxs2("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxs2(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx7("div", { className: "h-px w-12 bg-primary/40" }),
            /* @__PURE__ */ jsx7("span", { className: "text-xs tracking-[0.3em] uppercase text-primary font-body font-medium", children: t.eyebrow }),
            /* @__PURE__ */ jsx7("div", { className: "h-px w-12 bg-primary/40" })
          ] }),
          /* @__PURE__ */ jsxs2("h2", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground", children: [
            t.heading.split(" ")[0],
            " ",
            /* @__PURE__ */ jsx7("span", { className: "font-semibold italic", children: t.heading.split(" ").slice(1).join(" ") })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx7(
      motion.div,
      {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mb-14",
        children: /* @__PURE__ */ jsxs2("div", { className: "bg-background border border-border/40 rounded-sm p-6 lg:p-8", children: [
          /* @__PURE__ */ jsx7("div", { className: "flex items-center gap-2.5 mb-5", children: /* @__PURE__ */ jsx7("p", { className: "text-xs tracking-[0.25em] uppercase text-primary font-medium", children: t.inclusionsLabel }) }),
          /* @__PURE__ */ jsx7("div", { className: "grid sm:grid-cols-3 gap-5", children: inclusions.map((item, i) => /* @__PURE__ */ jsxs2("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx7(Check, { className: "w-4.5 h-4.5 text-primary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx7("p", { className: "text-sm font-semibold text-foreground font-body mb-1", children: item.title }),
              /* @__PURE__ */ jsx7("p", { className: "text-sm text-muted-foreground leading-relaxed font-body", children: item.desc })
            ] })
          ] }, i)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx7("div", { className: "mb-8 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0", children: /* @__PURE__ */ jsx7("div", { className: "flex gap-0 border-b border-border/30 min-w-max lg:min-w-0", children: categories.map((cat) => {
      const isActive = activeTab === cat.id;
      return /* @__PURE__ */ jsxs2(
        "button",
        {
          onClick: () => setActiveTab(cat.id),
          className: "relative px-5 py-3.5 text-xs tracking-[0.18em] uppercase font-medium font-body transition-colors",
          style: { color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" },
          children: [
            cat.label,
            isActive && /* @__PURE__ */ jsx7(
              motion.div,
              {
                layoutId: "tab-indicator",
                className: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary",
                transition: { type: "spring", stiffness: 400, damping: 35 }
              }
            )
          ]
        },
        cat.id
      );
    }) }) }),
    /* @__PURE__ */ jsx7(AnimatePresence, { mode: "wait", children: active && /* @__PURE__ */ jsxs2(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.3 },
        children: [
          /* @__PURE__ */ jsxs2("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx7("h3", { className: "font-display text-3xl md:text-4xl font-light text-foreground mb-2", children: active.fullLabel }),
            /* @__PURE__ */ jsx7("p", { className: "text-sm font-body text-muted-foreground italic", children: active.tagline })
          ] }),
          /* @__PURE__ */ jsx7("div", { className: "space-y-10", children: active.groups.map((group, gi) => /* @__PURE__ */ jsxs2("div", { children: [
            group.groupName && /* @__PURE__ */ jsxs2("div", { className: `flex items-center gap-3 mb-4 ${group.isAddOn ? "mt-6" : ""}`, children: [
              /* @__PURE__ */ jsx7("p", { className: "text-[10px] tracking-[0.28em] uppercase font-medium font-body text-muted-foreground", children: group.groupName }),
              /* @__PURE__ */ jsx7("div", { className: `flex-1 h-px ${group.isAddOn ? "border-t border-dashed border-border/40" : "bg-border/30"}` })
            ] }),
            group.isAddOn ? /* @__PURE__ */ jsx7("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: group.items.map((item, i) => /* @__PURE__ */ jsx7(AddOnCard, { item, index: i }, i)) }) : /* @__PURE__ */ jsxs2(Fragment4, { children: [
              /* @__PURE__ */ jsx7(MobileFlashcards, { items: group.items, isPremium: group.isPremium }),
              /* @__PURE__ */ jsx7("div", { className: `hidden md:grid md:grid-cols-2 gap-6 ${group.isPremium ? "lg:grid-cols-3" : "lg:grid-cols-4"}`, children: group.items.map((item, i) => /* @__PURE__ */ jsx7(ServiceCard, { item, index: i, isPremium: group.isPremium }, i)) })
            ] })
          ] }, gi)) }),
          active.id === "face" && /* @__PURE__ */ jsx7(FaceCareGuide, {})
        ]
      },
      active.id
    ) }),
    /* @__PURE__ */ jsxs2(
      motion.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        className: "mt-8",
        children: [
          /* @__PURE__ */ jsxs2(
            "button",
            {
              onClick: () => setNotesOpen((o) => !o),
              className: "w-full flex items-center justify-between px-6 py-4 bg-background border border-border/40 rounded-sm hover:border-primary/30 transition-colors",
              children: [
                /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx7(Clock, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsx7("p", { className: "text-xs tracking-[0.2em] uppercase text-primary font-medium font-body", children: t.durationToggle })
                ] }),
                /* @__PURE__ */ jsx7(ChevronDown, { className: `w-4 h-4 text-muted-foreground transition-transform duration-200 ${notesOpen ? "rotate-180" : ""}` })
              ]
            }
          ),
          /* @__PURE__ */ jsx7(AnimatePresence, { children: notesOpen && /* @__PURE__ */ jsx7(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.3 },
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsxs2("div", { className: "bg-background border border-t-0 border-border/40 rounded-b-sm px-6 py-6", children: [
                /* @__PURE__ */ jsx7("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5 font-body", children: t.durationIntro }),
                /* @__PURE__ */ jsx7("div", { className: "grid md:grid-cols-2 gap-5", children: durationNotes.map((note, i) => /* @__PURE__ */ jsxs2("div", { className: "flex gap-3 items-start", children: [
                  /* @__PURE__ */ jsx7(Check, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxs2("div", { children: [
                    /* @__PURE__ */ jsx7("p", { className: "text-sm font-semibold text-foreground font-body mb-0.5", children: note.title }),
                    /* @__PURE__ */ jsx7("p", { className: "text-sm text-muted-foreground leading-relaxed font-body", children: note.desc })
                  ] })
                ] }, i)) })
              ] })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs2(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mt-14 text-center",
        children: [
          /* @__PURE__ */ jsx7("p", { className: "font-display italic text-lg text-foreground/50 mb-6", children: t.servicesBottomQuote }),
          /* @__PURE__ */ jsx7(
            "a",
            {
              href: "#contact",
              className: "inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:bg-primary/90 active:scale-95 transition-all",
              children: t.servicesBottomCta
            }
          )
        ]
      }
    )
  ] }) });
}

// test-render-ua.jsx
import { jsx as jsx8 } from "react/jsx-runtime";
var TestComponent = () => {
  const { setLang } = useLang();
  setLang("ua");
  return /* @__PURE__ */ jsx8(ServicesSection, {});
};
try {
  const html = renderToString(
    /* @__PURE__ */ jsx8(LangProvider, { children: /* @__PURE__ */ jsx8(TestComponent, {}) })
  );
  console.log("SUCCESS");
} catch (e) {
  console.error("ERROR:", e);
}
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/arrow-down.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/circle-alert.js:
lucide-react/dist/esm/icons/clock.js:
lucide-react/dist/esm/icons/heart.js:
lucide-react/dist/esm/icons/info.js:
lucide-react/dist/esm/icons/smile.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/star.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
