import React from "react";

export const CheckBox = ({ handleCheckbox, official, others, personal }) => {
    return (
        <>
            <form aria-required>
                <div>
                    <input
                        type="checkbox"
                        name="Personal"
                        id="Personal"
                        value={personal}
                        checked={personal}
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="Personal">Personal</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="Official"
                        id="Official"
                        value={official}
                        checked={official}
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="Official">Official</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="Others"
                        value={others}
                        checked={others}
                        id="Others"
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="Others">Others</label>
                </div>
            </form>
        </>
    );
};
