export const Card = ({ title, year, poster }) => {
  return (
    <article className="group relative w-full max-w-52 aspect-2/3 overflow-hidden cursor-pointer rounded-md">
      <div
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-200 group-hover:opacity-50"
        style={{ backgroundImage: `url(${poster})` }}
      />

      
      <div className="relative z-10 group-hover:flex h-full flex-col justify-end p-2 hidden ">
        <h2 className="font-bold text-white">{title}</h2>
        <p className="text-white">{year}</p>
      </div>
    </article>
  );
};
