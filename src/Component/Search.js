import React from 'react';

const Search = () => {
    return (
        <div>
          <div>
            <>
            <div className="container-fluid bg-secondary pt-5 mt-5 p-4">
            <div className="row">
                <div className="col-4 px-4">
                    <select className="form-select">
                        <option value="">Pune</option>
                    </select>
                </div>
                <div className="col-4 px-4">
                    <select className="form-select">
                        <option value="">Nagpur</option>
                    </select>
                </div>
                <div className="col-2 px-2">
                    <input type="text" className="form-control" defaultValue="12-12-2023" />
                </div>
                <div className="col-2 text-end">
                    <button type="button" className="btn btn-primary btn-sm">Modify Search</button>
                </div>
            </div>
        </div>
            </>
        </div>  
        </div>
    );
};

export default Search;