import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { IoCarOutline } from "react-icons/io5";
import { CiMap } from "react-icons/ci";
import './Sidebar.css';

const SidebarMenu = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='bg-white col-auto min-vh-100 d-flex justify-content-between flex-column'>
                    <div>
                        <div className='spacerdv'>
                            <a className='text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-3 mt-2'>
                                <span className='ms-1 fs-4 d-none d-sm-inline styletxthead'>ViajaBara</span>
                            </a>
                        </div>
                        <hr className='text-secondary d-none d-sm-block my-2' />
                        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" className="nav-link d-flex align-items-center"><CiMap /><span className='ms-2 d-none d-sm-inline'>Viajes</span></a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" className="nav-link d-flex align-items-center"><IoCarOutline /><span className='ms-2 d-none d-sm-inline'>Vehiculos</span></a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" className="nav-link d-flex align-items-center"><i className="bi bi-person"></i><span className='ms-2 d-none d-sm-inline'>Conductores</span></a>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown open">
                        <span className='text-white d-none d-sm-inline fs-4 admonstl'>Administrador</span>
                        <a className="btn btn-secondary text-white mt-2 btnclose" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="bi bi-box-arrow-right spani"></i><span className='ms-2 d-none d-sm-inline spani'>Cerrar sesión</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarMenu;
