import React from 'react';
import { ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

interface GradientBackgroundProps extends ViewProps {
  children: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style, className, ...props }) => {
  return (
    <LinearGradient
      colors={[colors.background, '#0A2540']}
      className={className ? className + " flex-1" : "flex-1"}
      style={style}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
