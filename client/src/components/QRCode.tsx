/**
 * QRCode Component:
 * - Renders the QR Code of the user profile
 * - Renders a button to download the QR Code
 *
 * Props
 * - username : User's username to form the QR Code
 */

import { saveAs } from "file-saver";
import toast from "react-hot-toast";

// Props
interface QRCodeProps {
  username: string;
}

const QRCode: React.FC<QRCodeProps> = ({ username }) => {
  // Function to handle QR code download
  const handleDownloadQRCode = async () => {
    try {
      // Getting the QR code URL
      const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${
        import.meta.env.VITE_HOST_URL
      }/profile/${username}&amp;size=180x180`;

      // Fetching the QR code image
      const response = await fetch(qrCodeURL);
      if (!response.ok) {
        throw new Error("Failed to download QR code image");
      }

      // Converting the response to a blob
      const blob = await response.blob();

      // Creating a file from the blob
      const file = new File([blob], "qr-code.png", { type: "image/png" });

      // Saving the file to the local filesystem
      saveAs(file);
      toast.success("QR code downloaded successfully");
    } catch (error) {
      // Displaying an error message if download fails
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR code");
    }
  };

  return (
    <section className="text-center">
      {/* Heading */}
      <h2 className="text-xl font-bold">QR CODE</h2>
      <p>Scan to see your profile</p>

      {/* QR Code */}
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?data=${
          import.meta.env.VITE_HOST_URL
        }/profile/${username}&amp;size=180x180`}
        alt=""
        title=""
        className="mx-auto mt-8 mb-3 w-44 h-44"
      />
      {/* Download button */}
      <button onClick={handleDownloadQRCode}>Download QR Code</button>
    </section>
  );
};

export default QRCode;
