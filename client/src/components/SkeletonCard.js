import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * COMPONENT: SkeletonCard
 * PURPOSE: Displays a skeleton loading state for a product card while data is being fetched.
 *
 * USAGE: Used as a placeholder in place of a product card while data is loading.
 */

export default function SkeletonCard() {
  return (
    <div className="h-[470px] w-[270px] bg-[#F2F2F2] rounded-2xl flex flex-col p-2">
      <div className="h-[230px] w-full object-cover rounded-2xl overflow-hidden">
        <Skeleton height="100%" />
      </div>

      <div className="flex flex-col gap-1 p-2">
        <Skeleton width="70%" height="2rem" />
        <div className="flex justify-between items-center">
          <Skeleton width="30%" height="2rem" />
          <Skeleton width="40%" height="2rem" />
        </div>
        <Skeleton count={3} height="1.5rem" />
        <div className="flex gap-1 items-end mb-1">
          <Skeleton width="20%" height="2rem" />
          <Skeleton width="50%" height="2rem" />
        </div>
        <div className="flex gap-2">
          <Skeleton width="30%" height="2rem" />
          <Skeleton width="60%" height="2rem" />
        </div>
      </div>
    </div>
  );
}
