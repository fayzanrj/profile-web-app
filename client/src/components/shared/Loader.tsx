/**
 * Loader Component:
 * - Renders a spinning loader to show user while loading
 * -
 */

const Loader = () => {
  return (
    <div className="CENTER">
      <svg className="loaderSvg" viewBox="25 25 50 50">
        <circle className="circle" r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Loader;
