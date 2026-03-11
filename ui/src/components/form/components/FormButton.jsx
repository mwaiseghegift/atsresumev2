import { MdAddCircle, MdRemoveCircle } from "react-icons/md";

const FormButton = ({ size, remove, add }) => {

    return (
      <div className="flex-wrap-gap-2 mb-3">
        <button type="button" onClick={add}
          aria-label="Add"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md hover:shadow-emerald-900/30">
          <MdAddCircle className="text-base" />
          Add
        </button>
        {
          size > 0 &&
          <button type="button" onClick={remove}
            aria-label="Remove"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-rose-500/30 hover:bg-rose-500/10 hover:border-rose-400/60 text-rose-400 hover:text-rose-300 text-xs font-semibold transition-all duration-200">
            <MdRemoveCircle className="text-base" />
            Remove
          </button>
        }
      </div>
    )
  }

export default FormButton;

