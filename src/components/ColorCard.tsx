import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { ColorInfo, copyToClipboard } from '../utils/colorUtils';

interface ColorCardProps {
  color: ColorInfo;
  size?: 'small' | 'medium' | 'large';
}

const ColorCard: React.FC<ColorCardProps> = ({ color, size = 'medium' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sizeClasses = {
    small: 'w-44 h-44',
    medium: 'w-48 h-48',
    large: 'w-52 h-52'
  };

  return (
    <Card className="group overflow-hidden hover-glow transition-all   duration-300 hover:scale-105">
      <div 
        className={`${sizeClasses[size]} relative`}
        style={{ backgroundColor: color.hex }}
      >
        <div className="absolute inset-0 bg-black/0  transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center space-y-2">
            {/* <Button
              size="sm"
              variant="secondary"
              onClick={() => handleCopy(color.hex)}
              className="glass-effect"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button> */}
          </div>
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-semibold">{color.hex}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCopy(color.hex)}
            className="p-1"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <div>RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}</div>
          <div>HSL: {Math.round(color.hsl.h)}°, {Math.round(color.hsl.s)}%, {Math.round(color.hsl.l)}%</div>
        </div>
        
        {/* <Button
          size="sm"
          variant="outline"
          onClick={() => handleCopy(color.css)}
          className="w-full text-xs"
        >
          Copy CSS
        </Button> */}
      </div>
    </Card>
  );
};

export default ColorCard;