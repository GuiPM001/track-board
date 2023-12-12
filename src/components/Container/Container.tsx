import { ReactNode, useState } from "react";
import { Track } from "interfaces/Track";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface ContainerProps {
  title: string;
  items: Track[];
  children?: ReactNode;
  showAll?: boolean;
}

export default function Container(props: ContainerProps) {
  const {title, items, children, showAll = false} = props;

  const [numItemsToShow, setNumItemsToShow] = useState<number>(4);
  const [seeAll, setSeeAll] = useState<boolean>(showAll);

  function seeAllTracks() {
    setNumItemsToShow(items.length);
    setSeeAll(true);
  }

  function seeLess() {
    setSeeAll(false);
    setNumItemsToShow(4);
  }

  return (
    <section className="w-full border border-slate-200 md:rounded-lg px-4 pt-4 mb-6">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-lg">{title}</h1>

        {!showAll && numItemsToShow < items.length && (
          <button
            onClick={seeAllTracks}
            className="font-bold text-slate-400 hover:text-emerald-500 active:scale-95 transition duration-150 ease-in-out"
          >
            See all
            <FontAwesomeIcon icon={faCaretDown} className="text-lg ml-2" />
          </button>
        )}

        {!showAll && seeAll && (
          <button
            data-testid="seeLessBtn"
            onClick={seeLess}
            className="font-bold text-slate-400 hover:text-emerald-500 active:scale-95 transition duration-150 ease-in-out"
          >
            <FontAwesomeIcon icon={faCaretUp} className="text-lg" />
          </button>
        )}
      </div>

      {items.length ? (
        <div
          className={
            !seeAll
              ? "flex flex-wrap justify-between overflow-hidden h-52 md:h-60"
              : "flex flex-wrap justify-between overflow-hidden h-auto"
          }
        >
          {children}
        </div>
      ) : (
        <p className="flex justify-center items-center pb-12">
          No data
        </p>
      )}
    </section>
  );
}
