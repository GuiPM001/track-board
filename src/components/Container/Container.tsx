import { ReactNode, useState } from "react";
import { Track } from "interfaces/Track";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/Loading/Loading";

interface ContainerProps {
  title: string;
  items: Track[];
  children?: ReactNode;
  showAll?: boolean;
  isLoading?: boolean;
}

export default function Container(props: ContainerProps) {
  const { title, items, children, showAll = false, isLoading } = props;

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
    <section className="w-full mb-16 px-4 md:pl-0 lg:px-0">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-xl">{title}</h1>

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

      {isLoading && <Loading />}

      {items?.length > 0 && !isLoading && (
        <div
          className={
            !seeAll
              ? "flex flex-wrap justify-between overflow-hidden h-[275px]"
              : "flex flex-wrap justify-between overflow-hidden h-auto"
          }
        >
          {children}
        </div>
      )}

      {!items.length && !isLoading && (
        <p className="flex justify-center items-center pb-12">No data</p>
      )}
    </section>
  );
}
