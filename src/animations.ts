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
  // Scheduling to/from anything => full fade
  if (from === "scheduling" || to === "scheduling") {
    return { header: "fade", main: "fade", footer: "fade" };
  }

  switch (from + "->" + to) {
    // Start ↔ Standby, Mappool, Winner -> Slide top & middle, instant bottom
    case "start->standby":
    case "standby->start":
    case "start->mappool":
    case "mappool->start":
    case "start->winner":
    case "winner->start":
      return { header: "slide", main: "slide", footer: "none" };

    // Start ↔ Versus -> Slide top & middle, Fade bottom
    case "start->versus":
    case "versus->start":
      return { header: "slide", main: "slide", footer: "fade" };

    // Standby ↔ Mappool -> Fade top, Slide middle, instant bottom
    case "standby->mappool":
    case "mappool->standby":
      return { header: "fade", main: "slide", footer: "none" };

    // Standby ↔ Versus -> Fade top & bottom in (full fade)
    case "standby->versus":
    case "versus->standby":
      return { header: "fade", main: "fade", footer: "fade" };

    // Standby ↔ Winner -> Slide top & middle, instant bottom
    case "standby->winner":
    case "winner->standby":
      return { header: "slide", main: "slide", footer: "none" };

    // Versus ↔ Mappool -> Slide middle, Fade bottom in
    case "versus->mappool":
    case "mappool->versus":
      return { header: "fade", main: "slide", footer: "fade" };

    // Versus ↔ Winner -> Slide top & middle, Fade bottom in
    case "versus->winner":
    case "winner->versus":
      return { header: "slide", main: "slide", footer: "fade" };

    // Mappool ↔ Winner -> Slide top & middle, instant bottom
    case "mappool->winner":
    case "winner->mappool":
      return { header: "slide", main: "slide", footer: "none" };

    // Default -> full fade
    default:
      return { header: "fade", main: "fade", footer: "fade" };
  }
}
