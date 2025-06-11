import React, { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    type: "success", // Type can be either "success" or "error"
    message: "", // Message to be displayed
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to trigger alert
  const showAlert = (type, message) => {
    setState({ isOpen: true, type, message });
    onOpen(); // Opens the alert dialog
  };

  const closeAlert = () => {
    setState({ ...state, isOpen: false });
    onClose(); // Closes the alert dialog
  };

  return (
    <AlertContext.Provider
      value={{
        ...state,
        onOpen: showAlert,
        onClose: closeAlert,
      }}
    >
      {children}
      {/* Implementing Chakra UI's Alert Dialog */}
      {state.isOpen && (
        <AlertDialog
          isOpen={isOpen}
          onClose={closeAlert}
          motionPreset="slideInBottom"
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {state.type === "success" ? "Success!" : "Error"}
              </AlertDialogHeader>
              <AlertDialogBody>{state.message}</AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="blue" onClick={closeAlert}>
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
