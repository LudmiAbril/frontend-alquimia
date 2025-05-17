type StepCardProps = {
  image: string;
  alt: string;
  text: string;
};

export default function StepCard({ image, alt, text }: StepCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm w-full max-w-[160px] text-center overflow-hidden">
      <img src={image} alt={alt} className="w-full h-[130px] object-cover" />
      <p className="text-sm font-medium px-3 py-4">{text}</p>
    </div>
  );
}
