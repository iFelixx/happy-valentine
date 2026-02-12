"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/components/hooks/use-outside-click";

interface FontStyles {
  titleFont: {
    family: string;
    size: string;
    weight: string;
    color: string;
  };

  descriptionFont: {
    family: string;
    size: string;
    weight: string;
    color: string;
  };

  contentFont: {
    family: string;
    size: string;
    weight: string;
    color: string;
  };

  buttonFont: {
    family: string;
    size: string;
    weight: string;
  };
}

const defaultFontStyles: FontStyles = {
  titleFont: {
    family: "Fredoka",
    size: "18px",
    weight: "600",
    color: "#bf2ef0",
  },

  descriptionFont: {
    family: "Fredoka",
    size: "17px",
    weight: "500",
    color: "#c4b7ee",
  },

  contentFont: {
    family: "Fredoka",
    size: "16px",
    weight: "500",
    color: "#c4b7ee",
  },
  
  buttonFont: {
    family: "Fredoka",
    size: "17px",
    weight: "500",
  },
};

const buttonStyles = {
  backgroundColor: "#bf2ef0",
  textColor: "#c1fcf5",
  hoverBackgroundColor: "#c1fcf5",
  hoverTextColor: "#bf2ef0",
};

interface ExpandableCardDemoProps {
  fontStyles?: FontStyles;
  onModalStateChange?: (isOpen: boolean) => void;
}

export function ExpandableCardDemo({ fontStyles = defaultFontStyles, onModalStateChange }: ExpandableCardDemoProps) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
        onModalStateChange?.(false);
      }
    }

    if (active && typeof active === "object") {
      onModalStateChange?.(true);
      if (modalRef.current && window.innerWidth < 768) {
        modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      onModalStateChange?.(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onModalStateChange]);

  const handleCloseModal = () => {
    setActive(null);
    onModalStateChange?.(false);
  };

  useOutsideClick(ref, handleCloseModal);

  const getTitleStyle = () => ({
    fontFamily: fontStyles.titleFont.family,
    fontSize: fontStyles.titleFont.size,
    fontWeight: fontStyles.titleFont.weight,
    color:fontStyles.titleFont.color
  });

  const getDescriptionStyle = () => ({
    fontFamily: fontStyles.descriptionFont.family,
    fontSize: fontStyles.descriptionFont.size,
    fontWeight: fontStyles.descriptionFont.weight,
    color:fontStyles.descriptionFont.color
  });

  const getContentStyle = () => ({
    fontFamily: fontStyles.contentFont.family,
    fontSize: fontStyles.contentFont.size,
    fontWeight: fontStyles.contentFont.weight,
    color:fontStyles.contentFont.color
  });

  const getButtonStyle = (isHover: boolean) => ({
    fontFamily: fontStyles.buttonFont.family,
    fontSize: fontStyles.buttonFont.size,
    fontWeight: fontStyles.buttonFont.weight,
    backgroundColor: isHover ? buttonStyles.hoverBackgroundColor : buttonStyles.backgroundColor,
    color: isHover ? buttonStyles.hoverTextColor : buttonStyles.textColor,
  });

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={modalRef}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden relative"
            >
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.05 },
                }}
                className="flex absolute top-4 left-1/2 -translate-x-1/2 items-center justify-center rounded-full h-10 w-10 sm:h-12 sm:w-12 shadow-lg z-[200]"
                style={{ backgroundColor: "#bf2ef0" }}
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </motion.button>
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-56 sm:h-80 md:h-96 object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex flex-col md:flex-row justify-between items-start p-4 gap-4">
                  <div className="w-full md:w-auto">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      style={getTitleStyle()}
                      className="text-neutral-800 dark:text-neutral-200 text-center md:text-left mb-2"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      style={getDescriptionStyle()}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    target="_blank"
                    style={getButtonStyle(false)}
                    className="px-4 py-3 rounded-full w-full md:w-auto text-center"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={getContentStyle()}
                    className="text-neutral-600 dark:text-neutral-400 h-40 md:h-[150px] pb-10 flex flex-col items-start gap-4 overflow-y-auto [mask:linear-gradient(to_bottom,white,white,transparent)]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => {setActive(card); onModalStateChange?.(true);}}
            className="p-4 flex flex-col sm:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col sm:flex-row items-center sm:items-start">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 sm:h-20 sm:w-20 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="text-center sm:text-left">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  style={getTitleStyle()}
                  className="text-neutral-800 dark:text-neutral-200 mb-1"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  style={getDescriptionStyle()}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              style={getButtonStyle(false)}
              className="px-4 py-2 rounded-full mt-2 sm:mt-0 w-[170px] sm:w-auto"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyles.hoverBackgroundColor;
                e.currentTarget.style.color = buttonStyles.hoverTextColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor;
                e.currentTarget.style.color = buttonStyles.textColor;
              }}
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-[#c1fcf5]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Beginning of the Story",
    title: "Introduction ✨",
    src: "/images/meetu.jpg",
    ctaText: "Open",
    content: () => {
      return (
        <div className="space-y-4 leading-relaxed">
          <p>
            Hollaaaa, my dearest girlfriend, who is always so sweet, beautiful, adorable, cute, and charming. 
            There is something i wann to tell u.
          </p>
          
          <p>
            Babyyy, i truly want to express my deepest gratitude for the fact
            that we were able to meet each other. Our first meeting may not have
            been special, but for me, it has become the most special and
            the best gift in my life.
          </p>

          <p>
            Do u know? before meeting u, i always felt that my life was
            empty, monotonous, and boring. But somehow, that changed when u
            entered my life.
          </p>

          <p>
            Your presence has made me feel a happiness i’ve never felt before,
            as if u’ve brought a new color that makes my life feel more alive
            and meaningful.
          </p>

          <p>
            Im truly lucky to know u, to have met u, and to love u. U
            are the greatest gift in my life this year.
          </p>
        </div>
      );
    },
  },  

  {
    description: "Meyin Shenyue",
    title: "99 Reasons I Love u 🤍",
    src: "/images/loveu.png",
    ctaText: "Open",
    content: () => {
      return (
        <p>
          1. Your smile is so enchanting. <br />
          2. Your voice is incredibly soothing. <br />
          3. Your eyes speak more than words. <br />
          4. Your personality is full of color and life. <br />
          5. Your patience is extraordinary. <br />
          6. Your heart is filled with love and kindness. <br />
          7. Your sincerity touches the soul deeply. <br />
          8. Your presence makes the world more beautiful. <br />
          9. Your laughter is the best music to my ears. <br />
          10. You’re so cheerful and delightful. <br />
          11. Your kindness shines like an eternal light. <br />
          12. Your care is genuine and heartwarming. <br />
          13. The way you speak is very soft and respectful. <br />
          14. You always understand others so well. <br />
          15. Every step you take radiates elegance. <br />
          16. Your positive energy is contagious. <br />
          17. You always know how to make people smile. <br />
          18. Your wisdom is my inspiration. <br />
          19. Your friendliness melts any barrier. <br />
          20. You are someone everyone can rely on. <br />
          21. Your face radiates joy. <br />
          22. You have such a strong character. <br />
          23. Your creative ideas are always amazing. <br />
          24. Your sincerity is a remarkable strength. <br />
          25. You always bring comfort to those around you. <br />
          26. Your warmth feels like a comforting hug. <br />
          27. The way you support others is extraordinary. <br />
          28. You are a source of happiness for many. <br />
          29. Your enthusiasm ignites motivation. <br />
          30. Your intelligence always impresses me. <br />
          31. You have such a big and kind heart. <br />
          32. Your hospitality makes everyone feel welcome. <br />
          33. You always make people feel appreciated. <br />
          34. You remind me that goodness still exists. <br />
          35. The way you see the world is so unique. <br />
          36. Your humility is captivating. <br />
          37. You always give your best self to everything. <br />
          38. Your honesty is truly admirable. <br />
          39. You always bring a positive influence. <br />
          40. You bring peace to every situation. <br />
          41. Your courage is a great inspiration. <br />
          42. The warmth in your words is irreplaceable. <br />
          43. The way you love is beautifully extraordinary. <br />
          44. Your gentle nature touches everyone’s heart. <br />
          45. You are the best motivator. <br />
          46. Your optimism is a powerful force. <br />
          47. You always know how to give hope. <br />
          48. Your attention to detail is deep and sincere. <br />
          49. You are the best listener anyone could ask for. <br />
          50. Your resilience is truly admirable. <br />
          51. You create happiness wherever you go. <br />
          52. You have such a beautiful soul. <br />
          53. Every word you speak carries warmth and meaning. <br />
          54. Your cheerful nature brightens the world. <br />
          55. You are a star that always shines. <br />
          56. The way you think is inspiring and mesmerizing. <br />
          57. Your bravery to face anything is incredible. <br />
          58. Your calmness makes others feel safe. <br />
          59. Your sacrifices are always so heartfelt. <br />
          60. You are the best example of kindness. <br />
          61. The way you value others is deeply touching. <br />
          62. Your patience is truly remarkable. <br />
          63. Your loyalty is something rare and precious. <br />
          64. You are always there when needed. <br />
          65. Every action you take is full of love. <br />
          66. You are a reflection of true beauty. <br />
          67. Your warmth always makes people feel welcome. <br />
          68. You are an inspiration to many. <br />
          69. The beauty of your heart is unmatched. <br />
          70. You always bring hope during tough times. <br />
          71. Your love is so pure and real. <br />
          72. You are someone who truly appreciates others. <br />
          73. Your personality is a gift to the world. <br />
          74. You create calmness in every situation. <br />
          75. You bring light in the darkest moments. <br />
          76. You are full of love and care. <br />
          77. Your heart is a home for true love. <br />
          78. You give an extraordinary sense of trust. <br />
          79. You are the calm in life’s storms. <br />
          80. Your grace is captivating. <br />
          81. Your zest for life is truly inspiring. <br />
          82. You bring peace wherever you go. <br />
          83. Your compassion is unparalleled. <br />
          84. The way you love is nothing short of a miracle. <br />
          85. You always respect others with all your heart. <br />
          86. Your presence is the greatest gift. <br />
          87. You are someone I am always proud of. <br />
          88. Your smile can change the world. <br />
          89. You are the embodiment of true love. <br />
          90. You bring warmth to everyone’s hearts. <br />
          91. You are the definition of a beautiful soul. <br />
          92. Your sincere attitude makes you so special. <br />
          93. You are a protector filled with love. <br />
          94. Your inner strength is incredible. <br />
          95. You make the world a better place. <br />
          96. You are an endless source of inspiration. <br />
          97. You always make people feel loved. <br />
          98. You are a symbol of all that is good in the world. <br />
          99. You are a true miracle. <br />
        </p>
      );
    },
  },
];