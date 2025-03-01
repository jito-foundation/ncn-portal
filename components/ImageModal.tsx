const ImageModal: React.FC<{ src: string; alt: string; onClose: () => void }> = ({
    src,
    alt,
    onClose,
}) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="relative max-w-5xl max-h-screen">
                <button
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
                    onClick={onClose}
                >
                    ✕
                </button>
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[90vh] object-contain"
                />
                <div className="mt-2 text-center text-white text-sm opacity-80">
                    {alt}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;