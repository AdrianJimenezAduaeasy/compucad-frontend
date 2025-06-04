import Cookies from "js-cookie";

export const PersistLocalStorage = <T,>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify({ ...value}))
};

export const clearLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

export const PersistCookieUser = (value: string) => {
    Cookies.set("token", JSON.stringify({ value }), { expires: 31 });

}

export const getToken = (): string => {
    let tokenObj = Cookies.get("token");
    const token = tokenObj ? JSON.parse(tokenObj).value : null;
    return token;
}

export const getUser = (): string => {
    let userObj = localStorage.getItem("user");
    const user = userObj ? JSON.parse(userObj) : null;
    return user;
}

export const getTheme = (): string => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDarkMode ? "dark" : "light";
    return theme;
}
 
export const getIpServer = (): string => {
    //const ip = "localhost";
    //return 'http://'+ ip +':8080';

    const ip = "compucad-85340514893.northamerica-south1.run.app";
    return 'https://'+ ip ;

}

export const clearCookiesUser = () => {
    Cookies.remove("token")
}

export const tableProps = {
    enableDensityToggle: true,
    enableRowSelection: true,
    enableGrouping: true,
    enableColumnFilters: true,
    enablePagination: true,
    enableSorting: true,
    enableGlobalFilter: true,
    enableTableFooter: true,
    enableClickToCopy: true,
    initialState: { 
      density: 'compact',
      pagination: { pageSize: 20, pageIndex: 0 },
    },
    paginationDisplayMode: 'pages',
    columnFilterDisplayMode: 'popover',
    positionToolbarAlertBanner: 'bottom',
    muiTablePaperProps: {
      sx: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '600px',
      }
    },
    muiTableContainerProps: {
      sx: { flex: 1 }
    },
  }
  
export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
