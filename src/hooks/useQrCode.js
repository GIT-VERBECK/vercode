import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

export const useQrCode = (options) => {
  const [qrCode] = useState(() => new QRCodeStyling({
    width: 280,
    height: 280,
    type: "svg",
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "H"
    },
    ...options
  }));

  const ref = useRef(null);

  useEffect(() => {
    qrCode.update(options);
  }, [qrCode, options]);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  const render = (containerElement) => {
    if (containerElement && !containerElement.hasChildNodes()) {
      qrCode.append(containerElement);
    }
  };

  const update = (newOptions) => {
    qrCode.update(newOptions);
  };

  const downloadPng = () => {
    qrCode.download({
      extension: "png",
      name: "vercode-qr"
    });
  };

  const downloadSvg = () => {
    qrCode.download({
      extension: "svg",
      name: "vercode-qr"
    });
  };

  return { ref, qrCode, update, downloadPng, downloadSvg, render };
};
