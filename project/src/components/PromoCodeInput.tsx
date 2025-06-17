import React, { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';

interface PromoCodeInputProps {
  onApply: (code: string) => Promise<boolean>;
  onRemove: () => void;
  appliedCode?: { code: string; description: string };
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  onApply,
  onRemove,
  appliedCode
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const success = await onApply(code.trim());
      if (success) {
        setCode('');
      } else {
        setError('Invalid promo code or minimum order requirement not met');
      }
    } catch (err) {
      setError('Error applying promo code');
    } finally {
      setIsLoading(false);
    }
  };

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">{appliedCode.code}</p>
            <p className="text-sm text-green-600">{appliedCode.description}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors duration-150"
          title="Remove promo code"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!code.trim() || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Applying...' : 'Apply'}
        </button>
      </form>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <X className="w-3 h-3" />
          {error}
        </p>
      )}
      
      <div className="text-xs text-gray-500">
        <p>Try: SAVE10, WELCOME20, or FREESHIP</p>
      </div>
    </div>
  );
};