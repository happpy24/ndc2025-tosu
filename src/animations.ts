export type AnimType = "fade" | "slide" | "none";

export interface AnimTypes {
  header: AnimType;
  main: AnimType;
  footer: AnimType;
}

const SLIDE_DISTANCE = 1920;

export const sectionVariants = {
  header: {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    },
    slide: (direction: 1 | -1) => ({
      initial: { x: SLIDE_DISTANCE * direction, opacity: 1 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -SLIDE_DISTANCE * direction, opacity: 1 },
      transition: { duration: 0.5 },
    }),
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
      transition: { duration: 0 },
    },
  },
  main: {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    },
    slide: (direction: 1 | -1) => ({
      initial: { x: SLIDE_DISTANCE * direction, opacity: 1 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -SLIDE_DISTANCE * direction, opacity: 1 },
      transition: { duration: 0.5 },
    }),
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
      transition: { duration: 0 },
    },
  },
  footer: {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    },
    slide: (direction: 1 | -1) => ({
      initial: { x: SLIDE_DISTANCE * direction, opacity: 1 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -SLIDE_DISTANCE * direction, opacity: 1 },
      transition: { duration: 0.5 },
    }),
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
      transition: { duration: 0 },
    },
  },
} as const;

/**
 * Determine animation type per section for a transition
 */
export function getAnimations(from: string, to: string): AnimTypes {
  // Default fade
  const anim: AnimTypes = { header: "fade", main: "fade", footer: "fade" };

  // Scheduling → always full fade
  if (from === "scheduling" || to === "scheduling") {
    return { header: "fade", main: "fade", footer: "fade" };
  }

  switch (from + "->" + to) {
    // Start ↔ Standby, Mappool, Winner
    case "start->standby":
    case "standby->start":
    case "start->mappool":
    case "mappool->start":
    case "start->winner":
    case "winner->start":
      return { header: "slide", main: "slide", footer: "none" };

    // Start ↔ Versus
    case "start->versus":
    case "versus->start":
      return { header: "slide", main: "slide", footer: "fade" };

    // Standby ↔ Mappool
    case "standby->mappool":
    case "mappool->standby":
      return { header: "fade", main: "slide", footer: "none" };

    // Standby ↔ Versus
    case "standby->versus":
    case "versus->standby":
      return { header: "fade", main: "fade", footer: "fade" };

    // Standby ↔ Winner
    case "standby->winner":
    case "winner->standby":
      return { header: "slide", main: "slide", footer: "none" };

    // Versus ↔ Mappool
    case "versus->mappool":
    case "mappool->versus":
      return { header: "fade", main: "slide", footer: "fade" };

    // Versus ↔ Winner
    case "versus->winner":
    case "winner->versus":
      return { header: "slide", main: "slide", footer: "fade" };

    // Mappool ↔ Winner
    case "mappool->winner":
    case "winner->mappool":
      return { header: "slide", main: "slide", footer: "none" };

    default:
      return anim;
  }
}
