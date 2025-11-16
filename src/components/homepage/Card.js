export default function Card({ title, subtitle, image, bgColor }) {
    return (
      <div
        className={`w-56 h-80 rounded-xl p-4 flex flex-col hover:scale-105 transition items-center text-center text-white shadow-md font-adlam-display-regular   `}
        style={{ backgroundColor: bgColor }}
      >
        <h3 className="font-bold text-xl mb-2">{title}</h3>
  
  
        <img src={image} alt={title} className="w-48 h-48 object-contain mb-2" />
  
  
        <p className="text-lg">{subtitle}</p>
      </div>
    );
  }
  