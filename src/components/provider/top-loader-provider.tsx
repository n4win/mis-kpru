import NextTopLoader from "nextjs-toploader";

export function TopLoaderProvider() {
  return (
    <>
      <NextTopLoader
        color="var(--main-color)"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px var(--sub-color),0 0 5px var(--sub-color)"
        zIndex={1000}
      />
    </>
  );
}
