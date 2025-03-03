export const runtime = "edge";

export default function NotFound() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <div className="h-screen text-center flex flex-col items-center justify-center" style={{
        fontFamily: "system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji'"
      }}>
        <div>
          <h1 className="next-error-h1 inline-block mr-2 pr-2 text-xl font-semibold border-r border-gray-300">
            404
          </h1>
          <div className="inline-block">
            <h2 className="m-0" >This page could not be found.</h2>
          </div>
        </div>
      </div>
    </>
  );
}
