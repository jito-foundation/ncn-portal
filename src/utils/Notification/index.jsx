import React, { useEffect } from "react";
import { Snackbar, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useNotifyContext } from "../../context/notifyContext";

const NotifyMsg = () => {
  const { notify, set_notify } = useNotifyContext();
  const handleClosePopup = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    set_notify({ open: false, msg: "", type: undefined });
  };

  useEffect(() => {
    window.addEventListener("online", () => {
      // Set hasNetwork to online when they change to online.
      set_notify({
        type: "success",
        msg: "Your internet connect was restored",
        open: true,
      });
    });
    window.addEventListener("offline", () => {
      // Set hasNetwork to offline when they change to offline.
      set_notify({
        btnText: "Refresh",
        onClick: () => window.location.reload(),
        btn: true,
        type: "error",
        msg: `You are currently offline.`,
        open: true,
      });
    });
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <Snackbar
      autoHideDuration={3000}
      onClose={(e, r) => handleClosePopup(e, r)}
      open={notify.open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={(e, r) => handleClosePopup(e, r)}
        severity={notify.type}
        action={
          notify.btn && (
            <Button
              color="inherit"
              size="small"
              onClick={() => notify.onClick()}
            >
              {notify.btnText}
            </Button>
          )
        }
      >
        {notify.msg || ""}
      </Alert>
    </Snackbar>
  );
};

export default NotifyMsg;
