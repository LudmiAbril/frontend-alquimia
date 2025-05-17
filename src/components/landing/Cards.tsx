type StepCardProps = {
  image: string;
  alt: string;
  text: string;
};

export default function StepCard({ image, alt, text }: StepCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm w-full max-w-[160px] text-center overflow-hidden min-h-[210px]">
      {/* <img src={image} alt={alt} className="w-full h-[130px] object-cover" /> */}
      {/* <img src={image} alt={alt} className="w-full max-h-[130px]  object-contain  rounded-xl" /> */}
      <div className="rounded-t-xl overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="max-w-full h-auto mx-auto"
          style={{ width: "160px", height: "140px" }}
        />
      </div>

      <p className="text-sm font-medium px-3 py-4">{text}</p>
    </div>
  );
}
