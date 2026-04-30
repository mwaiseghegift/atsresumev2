import { MdAddCircle, MdRemoveCircle } from "react-icons/md";

const FormButton = ({ size, remove, add }) => {

    return (
      <div className="flex-wrap-gap-2 mb-3">
        <button type="button" onClick={add}
          aria-label="Add"
          className="theme-button-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
          <MdAddCircle className="text-base" />
          Add
        </button>
        {
          size > 0 &&
          <button type="button" onClick={remove}
            aria-label="Remove"
            className="theme-button-danger inline-flex items-center gap-1.5 px-3 py-1.5 text-xs">
            <MdRemoveCircle className="text-base" />
            Remove
          </button>
        }
      </div>
    )
  }

export default FormButton;

