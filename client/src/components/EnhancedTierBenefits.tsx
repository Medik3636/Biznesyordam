import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Zap, Clock, Target, Award } from 'lucide-react';

interface TierBenefitsProps {
  currentCommission: number;
  newCommission: number;
  monthlyRevenue?: number;
  tierCost: number;
}

export function EnhancedTierBenefits({ 
  currentCommission, 
  newCommission, 
  monthlyRevenue = 50000000,
  tierCost 
}: TierBenefitsProps) {
  const commissionDiff = currentCommission - newCommission;
  const monthlySavings = monthlyRevenue * commissionDiff;
  const yearlySavings = monthlySavings * 12;
  const netMonthlySavings = monthlySavings - tierCost;
  const roi = tierCost > 0 ? ((netMonthlySavings / tierCost) * 100) : 0;
  const breakEvenDays = tierCost > 0 ? Math.ceil((tierCost / monthlySavings) * 30) : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' so\'m';
  };

  const benefits = [
    {
      icon: TrendingUp,
      label: 'Komissiya tejash',
      value: `${(commissionDiff * 100).toFixed(1)}%`,
      description: 'Har bir savdoda',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: DollarSign,
      label: 'Oylik tejamkorlik',
      value: formatCurrency(monthlySavings),
      description: `Yillik: ${formatCurrency(yearlySavings)}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Target,
      label: 'Sof foyda',
      value: formatCurrency(netMonthlySavings),
      description: 'Oylik (tarif to\'lovidan keyin)',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Zap,
      label: 'ROI',
      value: `${roi.toFixed(0)}%`,
      description: 'Birinchi oyda',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Clock,
      label: 'Break-even',
      value: `${breakEvenDays} kun`,
      description: 'Investitsiya qaytish muddati',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: Award,
      label: 'Yillik foyda',
      value: formatCurrency(yearlySavings - (tierCost * 12)),
      description: 'Umumiy tejamkorlik',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
        <h3 className="text-lg font-bold text-green-800 mb-2">💰 Moliyaviy Foyda Tahlili</h3>
        <p className="text-sm text-green-700">
          Bu tarifga o'tish orqali siz yiliga <span className="font-bold text-xl">{formatCurrency(yearlySavings)}</span> tejaysiz!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {benefits.map((benefit, index) => (
          <Card key={index} className={`${benefit.bgColor} border-none hover:shadow-lg transition-all`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                  <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{benefit.label}</p>
                  <p className={`text-lg font-bold ${benefit.color} truncate`}>{benefit.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-amber-600" />
          <h4 className="font-bold text-amber-900">Tezkor Qaytish</h4>
        </div>
        <p className="text-sm text-amber-800">
          Tarif to'lovi atigi <span className="font-bold">{breakEvenDays} kun</span> ichida o'zini oqlaydi. 
          Shundan keyin har oy <span className="font-bold">{formatCurrency(netMonthlySavings)}</span> qo'shimcha foyda!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">📈 Biznes O'sishi</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Ko'proq mahsulot qo'shish imkoniyati</li>
            <li>✓ Kengaytirilgan tahlil va hisobotlar</li>
            <li>✓ Ustuvor texnik yordam</li>
          </ul>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-2">⚡ Raqobat Ustunligi</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>✓ Past komissiya = yuqori foyda</li>
            <li>✓ Tezkor buyurtma qayta ishlash</li>
            <li>✓ Premium xususiyatlar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
