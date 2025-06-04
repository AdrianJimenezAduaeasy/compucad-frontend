import { Box, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { GridAddIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { createMRTColumnHelper, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


import React, { useEffect, useMemo, useState } from 'react'
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import ModalFormat from '../../../components/Modal/ModalFormat';
import { handleExportDataTable, handleExportRows } from '../../../utilities/TableConfigs.utility';
import { solicitudProcesoGet } from '../../../models/Procesos/SolicitudProceso.model';
import { getAllDTO } from '../../../services/Procesos/SolicitudProceso.service';
import CreateSolicitudProceso from './Create/CreateSolicitudProceso';
import { fetchPostAprobarSolicitudProceso, fetchPostCreateSolicitudProceso, fetchPostDeleteSolicitudProceso, fetchPostUpdateSolicitudProceso } from '../../../controllers/Procesos/SolicitudProceso.controller';
import UpdateSolicitudProceso from './Create/UpdateSoliciudProcesos';
import SnackbarLocal from '../../../components/Snackbar/SnackbarLocal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AppStore } from '../../../redux/store';
import { useSelector } from 'react-redux';


function SolicitudProcesos() {

    const [rows, setRows] = React.useState<solicitudProcesoGet[]>([]);
    const columnHelper = createMRTColumnHelper<any>();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<solicitudProcesoGet | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [statusSnackbar, setStatusSnackbar] = useState<string>("");
    const userState = useSelector((store: AppStore) => store.user);



    useEffect(() => {
        const fetchFuelLoads = async () => {
            try {
                const response = await getAllDTO();
                const data: solicitudProcesoGet[] = response.data;
                setRows(data);
            } catch (error) {
                console.error("Error fetching Solicitudes de Proceso:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFuelLoads();
    }, []);

    const columns = useMemo(() => [
        columnHelper.accessor('folio', {
            header: 'folio',
            size: 50,
            enableColumnFilter: false
        }),
        columnHelper.accessor('estadoSolicitud', {
            header: 'Estado',
            size: 120,
            Cell: ({ cell }) => {
                const status = cell.getValue() as string;
                return (
                    <Chip color={status === 'PENDIENTE' ? 'info' : status === 'FINALIZADA' ? 'success' : status == 'PENDIENTE_EVALUACION' ? 'warning' : 'error'} label={status} />
                );
            },
            filterVariant: 'select',
            filterSelectOptions: ['PENDIENTE', 'FINALIZADA', 'PENDIENTE_EVALUACION', 'RECHAZADA'],
        }),

        columnHelper.accessor('tipoArea', {
            header: 'area',
            size: 50,
            enableColumnFilter: false
        }),

        columnHelper.accessor('fechaEstimacion', {
            header: 'Fecha Estimada',
            size: 120,
            Cell: ({ cell }) => {
                const date = new Date(cell.getValue() as string);
                return date.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
            },
        }),

        columnHelper.accessor('userCreate.email', {
            header: 'Solicitante',
            size: 150,
        }),
        columnHelper.accessor('aprobado', {
            header: 'aprobado',
            size: 50,
            enableColumnFilter: false,
            Cell: ({ cell }) => {
                const status = cell.getValue() as boolean;
                return (
                    <Chip color={status ? 'success' : 'error'} label={status ? 'Si' : 'No'} />
                );
            },
        }),
        columnHelper.accessor('descripcion', {
            header: 'Descripcion',
            size: 50,
            enableColumnFilter: false
        }),
        columnHelper.accessor('asigned.email', {
            header: 'Aprovador',
            size: 150,
        }),
        columnHelper.accessor('fechaAprovacion', {
            header: 'Fecha Aprovacion',
            size: 120,
            Cell: ({ cell }) => {
                if (cell.getValue() === null) {
                    return '-';
                }
                const date = new Date(cell.getValue() as string);
                return date.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
            },
        }),
    ]
        , [rows]);

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleCloseUpdateModal = () => {
        setOpenEdit(false);
    }

    const table = useMaterialReactTable({
        columns,
        data: rows,
        enableDensityToggle: true,
        enableRowSelection: true,
        enableRowActions: true,
        enableGrouping: true,
        enableColumnFilters: true,
        enablePagination: true,
        enableSorting: true,
        enableGlobalFilter: true,
        enableTableFooter: true,
        enableClickToCopy: true,
        localization: MRT_Localization_ES,
        initialState: {
            density: 'compact',
            pagination: { pageSize: 50, pageIndex: 0 },
        },
        state: {
            isLoading: loading,
        },
        paginationDisplayMode: 'pages',
        columnFilterDisplayMode: 'popover',
        positionToolbarAlertBanner: 'bottom',
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex' }}>

                {((userState.role === 'Administrador') ||
                    (!row.original.userCreate || row.original.userCreate.email === userState.email)) && (
                        <>
                            <Tooltip title="Editar">
                                <IconButton
                                    onClick={() => {
                                        setSelectedRow(row.original);
                                        setOpenEdit(true);
                                    }}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                                <IconButton color="error" onClick={() => handleDelete(row.original.id)}>
                                    <GridDeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                {userState.role === 'Administrador' && (
                    <Tooltip title="Aprobar Solicitud">
                        <IconButton color="success" onClick={() => handleAprobar(row.original.id)}>
                            <CheckCircleIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <span>
                    <Button color='success' variant="contained" onClick={() => setOpen(true)} startIcon={<GridAddIcon />} sx={{ textTransform: 'none' }}>
                        Registrar
                    </Button>
                </span>
                <Tooltip title="Exportar todos los datos">
                    <Button
                        variant="contained"
                        onClick={() => handleExportDataTable(rows)}
                        startIcon={<FileDownloadIcon />}
                        sx={{ textTransform: 'none' }}
                    >
                        Todo
                    </Button>
                </Tooltip>

                <Tooltip title="Exportar filas visibles">
                    <span>
                        <Button
                            variant="outlined"
                            disabled={table.getRowModel().rows.length === 0}
                            onClick={() => handleExportRows(table.getRowModel().rows)}
                            startIcon={<FileDownloadIcon />}
                            sx={{ textTransform: 'none' }}
                        >
                            Página
                        </Button>
                    </span>
                </Tooltip>

                <Tooltip title="Exportar filas seleccionadas">
                    <span>
                        <Button
                            variant="outlined"
                            disabled={!table.getIsSomeRowsSelected()}
                            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                            startIcon={<FileDownloadIcon />}
                            sx={{ textTransform: 'none' }}
                        >
                            Selección
                        </Button>
                    </span>
                </Tooltip>

            </Box>
        ),
        muiTablePaperProps: {
            sx: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '600px'
            }
        },
        muiTableContainerProps: {
            sx: { flex: 1 }
        },
    });

    function handleCreate(formvalues: any): Promise<any> {
        return fetchPostCreateSolicitudProceso(formvalues).then((response) => {
            setRows((prevRows) => [...prevRows, response.data]);
            return response.status;
        }
        ).catch((error: Error) => {
            console.error("Error al crear la carga de combustible:", error);
            return error;
        });
    }

    function handleUpdate(formvalues: any): Promise<any> {
        return fetchPostUpdateSolicitudProceso(formvalues).then((response) => {
            setRows((prevRows) => prevRows.map(row => row.id === formvalues.id ? response.data : row));
            return response.status;
        }
        ).catch((error: Error) => {
            console.error("Error al actualizar la solicitud:", error);
            return error;
        });
    }

    function handleDelete(id: string): Promise<any> {
        return fetchPostDeleteSolicitudProceso(id).then((response) => {
            setRows((prevRows) => prevRows.filter(row => row.id !== id));
            setStatusSnackbar("success");
            return response.status;
        }
        ).catch((error: Error) => {
            console.error("Error al eliminar la solicitud:", error);
            setStatusSnackbar("error");

            return error;
        });
    }

    function handleAprobar(id: string): Promise<any> {
        return fetchPostAprobarSolicitudProceso(id).then((response) => {
            setRows((prevRows) => prevRows.map(row => row.id === id ? response.data : row));
            setStatusSnackbar("success");
            return response.status;
        }
        ).catch((error: Error) => {
            console.error("Error al aprobar la solicitud:", error);
            setStatusSnackbar("error");
            return error;
        });
    }

    return (
        <>
            <ModalFormat<solicitudProcesoGet>
                status={open}
                tittle="Solicitud de Proceso"
                onClose={handleCloseModal}
                object={{} as solicitudProcesoGet}
                content={<CreateSolicitudProceso />}
                method={handleCreate} />

            <ModalFormat<solicitudProcesoGet>
                status={openEdit}
                tittle="Solicitud de Proceso"
                onClose={handleCloseUpdateModal}
                object={selectedRow ? selectedRow : {} as solicitudProcesoGet}
                content={<UpdateSolicitudProceso solicitudProceso={selectedRow} />}
                method={handleUpdate} />

            <MaterialReactTable table={table} />
            {statusSnackbar && (
                <SnackbarLocal status={statusSnackbar} onClose={() => setStatusSnackbar("")} />
            )}

        </>

    )
}

export default SolicitudProcesos


