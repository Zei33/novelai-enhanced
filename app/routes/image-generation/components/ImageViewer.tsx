import { Box, Flex, Text } from '@radix-ui/themes';

interface ImageViewerProps {
	currentImage?: string;
}

export default function ImageViewer({ currentImage }: ImageViewerProps) {
	return (
		<Flex direction="column" style={{ height: '100%' }}>
			<Box 
				style={{ 
					width: '100%', 
					height: '100%', 
					backgroundColor: 'var(--gray-3)', 
					borderRadius: 'var(--radius-3)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					overflow: 'hidden'
				}}
			>
				{currentImage ? (
					<img 
						src={currentImage} 
						alt="Generated result" 
						style={{ 
							maxWidth: '100%', 
							maxHeight: '100%', 
							objectFit: 'contain' 
						}} 
					/>
				) : (
					<Box style={{ color: 'var(--gray-9)', textAlign: 'center', padding: '2rem' }}>
						No image generated yet
					</Box>
				)}
			</Box>
		</Flex>
	);
} 