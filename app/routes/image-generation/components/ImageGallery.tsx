import { Flex, Box, Text } from '@radix-ui/themes';

interface ImageGalleryProps {
	images: string[];
	onSelectImage: (image: string) => void;
	selectedImage?: string;
}

export default function ImageGallery({ images, onSelectImage, selectedImage }: ImageGalleryProps) {
	return (
		<Flex direction="column" gap="2" style={{ height: '100%' }}>
			<Box style={{ 
				overflowY: 'auto', 
				height: '100%',
				paddingRight: '4px'
			}}>
				{images.length > 0 ? (
					<Flex direction="column" gap="2">
						{images.map((image, index) => (
							<Box 
								key={index}
								style={{ 
									width: '100%',
									height: '150px',
									minHeight: '150px',
									borderRadius: 'var(--radius-2)',
									overflow: 'hidden',
									cursor: 'pointer',
									flexShrink: 0,
									border: image === selectedImage ? '2px solid var(--accent-9)' : '2px solid transparent'
								}}
								onClick={() => onSelectImage(image)}
							>
								<img 
									src={image} 
									alt={`Generated thumbnail ${index + 1}`} 
									style={{ 
										width: '100%', 
										height: '100%', 
										objectFit: 'cover' 
									}} 
								/>
							</Box>
						))}
					</Flex>
				) : (
					<Box style={{ color: 'var(--gray-9)', textAlign: 'center', padding: '1rem' }}>
						No generated images
					</Box>
				)}
			</Box>
		</Flex>
	);
} 