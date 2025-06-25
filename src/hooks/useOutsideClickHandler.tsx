import { useEffect, useRef, PropsWithChildren } from "react";

type OutsideClickHandlerProps = {
  onOutsideClick: (event: MouseEvent) => void;
} & PropsWithChildren;

export default function OutsideClickHandler({
  onOutsideClick,
  children,
}: OutsideClickHandlerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
}
