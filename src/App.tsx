import { useState, useRef } from 'react';
import { Logo } from './components/Logo';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Tabs } from './components/Tabs';
import { TextControls } from './components/TextControls';
import { ColorControls } from './components/ColorControls';
import { EffectsControls } from './components/EffectsControls';
import { SizeControls } from './components/SizeControls';
import { Preview } from './components/Preview';
import { ActionButtons } from './components/ActionButtons';
import { TwitterTemplate } from './components/templates/TwitterTemplate';
import { CodeTemplate } from './components/templates/CodeTemplate';
import { useTheme } from './context/ThemeContext';
import html2canvas from 'html2canvas';

function App() {
  const { theme } = useTheme();
  const previewRef = useRef(null);

  // Tab state
  const [activeTab, setActiveTab] = useState('Text');
  
  // Text controls state
  const [text, setText] = useState('Your text here');
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState(400);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [textShadow, setTextShadow] = useState('none');
  const [textTransform, setTextTransform] = useState<'none' | 'uppercase' | 'lowercase' | 'capitalize'>('none');
  const [textColor, setTextColor] = useState('#FF0000');

  // Code template state
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [language, setLanguage] = useState('javascript');

  // Color controls state
  const [color1, setColor1] = useState('#4158D0');
  const [color2, setColor2] = useState('#C850C0');
  const [angle, setAngle] = useState(45);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [gradient, setGradient] = useState(`linear-gradient(${angle}deg, ${color1}, ${color2})`);

  // Effects controls state
  const [blur, setBlur] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);
  const [skew, setSkew] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  // Size and background state
  const [selectedSize, setSelectedSize] = useState('Desktop');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [templateType, setTemplateType] = useState<'default' | 'twitter' | 'code'>('default');

  // History state for undo
  const [history, setHistory] = useState<Array<{
    gradient: string;
    color1: string;
    color2: string;
  }>>([{ gradient: `linear-gradient(45deg, #4158D0, #C850C0)`, color1: '#4158D0', color2: '#C850C0' }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update gradient function
  const updateGradient = (c1: string, c2: string) => {
    const newGradient = gradientType === 'linear'
      ? `linear-gradient(${angle}deg, ${c1}, ${c2})`
      : `radial-gradient(circle at center, ${c1}, ${c2})`;
    
    setGradient(newGradient);
    setHistory([...history.slice(0, currentIndex + 1), { gradient: newGradient, color1: c1, color2: c2 }]);
    setCurrentIndex(currentIndex + 1);
  };

  // Reset function
  const handleReset = () => {
    setText('Your text here');
    setFontSize(32);
    setFontWeight(400);
    setLetterSpacing(0);
    setFontFamily('Inter');
    setTextAlign('center');
    setTextShadow('none');
    setTextTransform('none');
    setTextColor('#ffffff');
    setColor1('#4158D0');
    setColor2('#C850C0');
    setAngle(45);
    setGradientType('linear');
    setBlur(0);
    setOpacity(100);
    setRotation(0);
    setScale(100);
    setSkew(0);
    setBrightness(100);
    setContrast(100);
    setSelectedSize('Desktop');
    setBackgroundImage('');
    setTemplateType('default');
    updateGradient('#4158D0', '#C850C0');
  };

  // Template selection handler
  const handleTemplateSelect = (template: string) => {
    if (template === 'Twitter Screenshot') {
      setText('the thing about artists is they make simple and boring ideas interesting');
      setTemplateType('twitter');
    } else if (template === 'Code Screenshot') {
      setTemplateType('code');
      setCode('function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}');
      setLanguage('javascript');
    } else {
      setTemplateType('default');
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-gray-100 text-gray-900'} flex flex-col md:flex-row overflow-hidden`}>
      <div className={`w-full md:w-80 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'} p-6 flex flex-col overflow-y-auto h-screen`}>
        <Logo />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'Text' && (
          <TextControls
            text={text}
            fontSize={fontSize}
            fontWeight={fontWeight}
            letterSpacing={letterSpacing}
            fontFamily={fontFamily}
            textAlign={textAlign}
            textShadow={textShadow}
            textTransform={textTransform}
            textColor={textColor}
            onTextChange={setText}
            onFontSizeChange={setFontSize}
            onFontWeightChange={setFontWeight}
            onLetterSpacingChange={setLetterSpacing}
            onFontFamilyChange={setFontFamily}
            onTextAlignChange={setTextAlign}
            onTextShadowChange={setTextShadow}
            onTextTransformChange={setTextTransform}
            onTextColorChange={setTextColor}
            templateType={templateType}
            code={code}
            onCodeChange={setCode}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}

        {activeTab === 'Colors' && (
          <ColorControls
            color1={color1}
            color2={color2}
            angle={angle}
            gradientType={gradientType}
            onColor1Change={(c) => {
              setColor1(c);
              updateGradient(c, color2);
            }}
            onColor2Change={(c) => {
              setColor2(c);
              updateGradient(color1, c);
            }}
            onAngleChange={setAngle}
            onGradientTypeChange={setGradientType}
            onPresetSelect={(c1, c2) => {
              setColor1(c1);
              setColor2(c2);
              updateGradient(c1, c2);
            }}
            gradientPresets={[
              ['#00C6FF', '#0072FF'],
              ['#FF512F', '#DD2476'],
              ['#FF61D2', '#FE9090'],
              ['#4158D0', '#C850C0'],
              ['#0093E9', '#80D0C7'],
              ['#8EC5FC', '#E0C3FC'],
              ['#D9AFD9', '#97D9E1'],
              ['#FFDEE9', '#B5FFFC'],
            ]}
          />
        )}

        {activeTab === 'Effects' && (
          <EffectsControls
            blur={blur}
            opacity={opacity}
            rotation={rotation}
            scale={scale}
            skew={skew}
            brightness={brightness}
            contrast={contrast}
            onBlurChange={setBlur}
            onOpacityChange={setOpacity}
            onRotationChange={setRotation}
            onScaleChange={setScale}
            onSkewChange={setSkew}
            onBrightnessChange={setBrightness}
            onContrastChange={setContrast}
          />
        )}

        <SizeControls
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          onDownload={() => {
            if (previewRef.current) {
              html2canvas(previewRef.current).then(canvas => {
                const link = document.createElement('a');
                link.download = 'gradient.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
              });
            }
          }}
        />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="sticky top-0 z-50 bg-inherit">
          <Header />
          <Navbar 
            onReset={handleReset} 
            onTemplateSelect={handleTemplateSelect}
            onHomeClick={handleReset}
          />
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <div ref={previewRef}>
            {templateType === 'twitter' ? (
              <TwitterTemplate
                text={text}
                fontSize={fontSize}
                fontFamily={fontFamily}
                textColor={textColor}
                blur={blur}
                opacity={opacity}
                rotation={rotation}
                scale={scale}
                skew={skew}
                brightness={brightness}
                contrast={contrast}
              />
            ) : templateType === 'code' ? (
              <CodeTemplate
                code={code}
                language={language}
                fontSize={fontSize}
                fontFamily={fontFamily}
                blur={blur}
                opacity={opacity}
                rotation={rotation}
                scale={scale}
                skew={skew}
                brightness={brightness}
                contrast={contrast}
              />
            ) : (
              <Preview
                selectedSize={selectedSize}
                gradient={gradient}
                text={text}
                fontSize={fontSize}
                fontWeight={fontWeight}
                letterSpacing={letterSpacing}
                fontFamily={fontFamily}
                textAlign={textAlign}
                textShadow={textShadow}
                textTransform={textTransform}
                textColor={textColor}
                blur={blur}
                opacity={opacity}
                rotation={rotation}
                scale={scale}
                skew={skew}
                brightness={brightness}
                contrast={contrast}
                backgroundImage={backgroundImage}
                gradientType={gradientType}
              />
            )}
          </div>
          <ActionButtons 
            onGenerateGradient={() => {
              const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
              const c1 = randomColor();
              const c2 = randomColor();
              setColor1(c1);
              setColor2(c2);
              updateGradient(c1, c2);
            }}
            onBackgroundImage={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const result = e.target?.result as string;
                    setBackgroundImage(result);
                  };
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }}
            onUndo={() => {
              if (currentIndex > 0) {
                const previousState = history[currentIndex - 1];
                setCurrentIndex(currentIndex - 1);
                if (previousState.gradient) {
                  setGradient(previousState.gradient);
                  setColor1(previousState.color1);
                  setColor2(previousState.color2);
                }
              }
            }}
            canUndo={currentIndex > 0}
          />
        </div>
      </div>
    </div>
  );
}

export default App;