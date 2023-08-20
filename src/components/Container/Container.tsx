import { ReactNode, useState } from "react";
import { Track } from "interfaces/Track";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface ContainerProps {
  title: string;
  items: Track[];
  children?: ReactNode;
}

export default function Container(props: ContainerProps) {
  const [numItemsToShow, setNumItemsToShow] = useState<number>(4);
  const [seeAll, setSeeAll] = useState<boolean>(false);

  function seeAllTracks() {
    setNumItemsToShow(props.items.length);
    setSeeAll(true);
  }

  function seeLess() {
    setSeeAll(false);
    setNumItemsToShow(4);
  }

  return (
    <section className="w-full border border-slate-200 rounded-lg px-4 pt-4 mb-6">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-lg">{props.title}</h1>

        {numItemsToShow < props.items.length && (
          <button
            onClick={seeAllTracks}
            className="font-bold text-slate-400 hover:text-emerald-500 active:scale-95 transition duration-150 ease-in-out"
          >
            See all
            <FontAwesomeIcon icon={faCaretDown} className="text-lg ml-2" />
          </button>
        )}

        {seeAll && (
          <button
            data-testid="seeLessBtn"
            onClick={seeLess}
            className="font-bold text-slate-400 hover:text-emerald-500 active:scale-95 transition duration-150 ease-in-out"
          >
            <FontAwesomeIcon icon={faCaretUp} className="text-lg" />
          </button>
        )}
      </div>

      {props.items.length ? (
        <div
          className={
            !seeAll
              ? "flex flex-wrap justify-between overflow-hidden h-52 md:h-60"
              : "flex flex-wrap justify-between overflow-hidden h-auto"
          }
        >
          {props.children}
        </div>
      ) : (
        <div>No data</div>
      )}
    </section>
  );
}
