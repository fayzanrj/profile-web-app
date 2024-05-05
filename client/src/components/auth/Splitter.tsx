/**
 * Splitter Component:
 * - Renders a line to split between Credentials auth and google auth.
 */

const Splitter = () => {
  return (
    <div className="relative w-full mx-auto max-w-80">
      <hr />
      <p className="absolute px-2 font-semibold transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2">
        OR
      </p>
    </div>
  );
};

export default Splitter;
