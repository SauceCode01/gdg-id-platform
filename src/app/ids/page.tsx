// import Grid from "@/components/GridBackground";
import Image from "next/image";
import Button from "@/components/Button";

const IDPage = () => {
  return (
    <>
      {/* ===== MOBILE VIEW CONTENT ===== */}
      <div className="flex flex-row gap-5 relative z-10 text-center px-6 lg:hidden">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            OFFICIAL GDG PUP DIGITAL ID
          </h1>
          <div className="flex justify-center">
            <Image
              src="/IDCard.png"
              alt="GDG ID"
              width={450}
              height={450}
              className="h-auto w-full max-w-sm object-contain"
            />
          </div>

          <div className="flex justify-center">
            <Button label="Download as PNG" bgColor="bg-blue-600" />
            <Button label="Download as PDF" bgColor="bg-green-600" />
          </div>
        </div>
      </div>

      {/* ===== DESKTOP / LARGE VIEW CONTENT ===== */}
      <div className="hidden lg:block relative z-10 text-center px-6">
        <div className="flex gap-x-52">
          <div>
            <Image
              src="/IDCard.png"
              alt="GDG ID"
              width={450}
              height={450}
              className="h-auto w-full max-w-md object-contain"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              OFFICIAL GDG PUP DIGITAL ID
            </h1>

            <Image
              src="/GDGLogo.png"
              alt="GDG ID"
              width={450}
              height={450}
              className="h-auto w-full max-w-md object-contain"
            />

            <div className="flex justify-center">
              <Button label="Download as PNG" bgColor="bg-blue-600" />
              <Button label="Download as PDF" bgColor="bg-green-600" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IDPage;
