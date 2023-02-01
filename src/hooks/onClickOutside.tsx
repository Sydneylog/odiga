import { useEffect } from "react"

interface clickOut {
 ref: HTMLDivElement;
  handler: (event: MouseEvent) => void;

}

export default function useOnclickOutside({ref, handler}:clickOut) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if(!ref.current || ref.current.contains(e.target)){
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
  return () => {
    document.removeEventListener("mousedown", listener);
    document.removeEventListener("touchstart", listener);
  }
  }, [ref, handler])
  
}
