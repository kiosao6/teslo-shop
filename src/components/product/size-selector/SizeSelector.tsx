import { Size } from "@/interfaces"

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeChange: (size:Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChange }:Props) => {
  return (
    <div className="my-5">
      <h3 className="font-medium mb-4">Tallas disponibles</h3>

      <div className="flex">

        {
          availableSizes.map(size => (
            <button
              onClick={() => onSizeChange(size) }
              key={size}
              className={`mx-2 hover:underline text-lg ${(size === selectedSize) && 'underline'}`}
            >
              { size }
            </button>
          ))
        }

      </div>
    </div>
  )
}