"use client";
import { useState } from 'react'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft,
  Bell,
  Search,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Home,
  PieChart,
  History
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
// Mock data for charts
const balanceData = [
  { name: 'Mon', balance: 2400 },
  { name: 'Tue', balance: 2800 },
  { name: 'Wed', balance: 3200 },
  { name: 'Thu', balance: 2900 },
  { name: 'Fri', balance: 3800 },
  { name: 'Sat', balance: 4200 },
  { name: 'Sun', balance: 4500 },
]

const transactionData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
]

// Mock transactions
const recentTransactions = [
  { id: 1, type: 'income', title: 'Salary Deposit', amount: 4500, date: 'Today, 9:41 AM', icon: '💰' },
  { id: 2, type: 'expense', title: 'Netflix Subscription', amount: -15.99, date: 'Today, 8:30 AM', icon: '🎬' },
  { id: 3, type: 'expense', title: 'Grocery Store', amount: -127.50, date: 'Yesterday', icon: '🛒' },
  { id: 4, type: 'income', title: 'Freelance Payment', amount: 850, date: 'Yesterday', icon: '💻' },
  { id: 5, type: 'expense', title: 'Electric Bill', amount: -94.20, date: 'Apr 1', icon: '⚡' },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-slate-800 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nexus
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <SidebarItem icon={Home} label="Dashboard" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarItem icon={PieChart} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            <SidebarItem icon={History} label="Transactions" active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
            <SidebarItem icon={CreditCard} label="Cards" active={activeTab === 'cards'} onClick={() => setActiveTab('cards')} />
            <SidebarItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>

          {/* User Profile */}
          <div className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-slate-400 truncate">john@nexus.com</p>
              </div>
              <LogOut className="h-5 w-5 text-slate-400 cursor-pointer hover:text-white transition" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition">
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 w-48"
              />
            </div>
            <button className="relative p-2 rounded-full hover:bg-slate-800 transition">
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8 space-y-6">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome back, John! 👋</h2>
              <p className="text-slate-400 mt-1">Here's what's happening with your finances today.</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
              <ArrowUpRight className="h-4 w-4" />
              Send Money
            </button>
          </div>

          {/* Balance Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BalanceCard 
              title="Total Balance"
              amount="$24,562.00"
              change="+12.5%"
              trend="up"
              icon={Wallet}
              color="blue"
            />
            <BalanceCard 
              title="Income"
              amount="$8,420.00"
              change="+8.2%"
              trend="up"
              icon={TrendingUp}
              color="green"
            />
            <BalanceCard 
              title="Expenses"
              amount="$3,248.00"
              change="-2.4%"
              trend="down"
              icon={TrendingDown}
              color="red"
            />
            <BalanceCard 
              title="Savings"
              amount="$12,450.00"
              change="+15.3%"
              trend="up"
              icon={CreditCard}
              color="purple"
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Balance Chart */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Balance History</h3>
                <select className="rounded-lg bg-slate-800 border-none px-3 py-1 text-sm text-slate-300 outline-none">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={balanceData}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Income vs Expenses */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Income vs Expenses</h3>
                <select className="rounded-lg bg-slate-800 border-none px-3 py-1 text-sm text-slate-300 outline-none">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition">View All</button>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between rounded-xl bg-slate-800/50 p-4 hover:bg-slate-800 transition">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-2xl">
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="font-medium text-white">{transaction.title}</p>
                      <p className="text-sm text-slate-400">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : ''}{transaction.amount.toFixed(2)}
                    </span>
                    {transaction.type === 'income' ? (
                      <ArrowDownLeft className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Component: Sidebar Item
function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
        active 
          ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  )
}

// Component: Balance Card
function BalanceCard({ title, amount, change, trend, icon: Icon, color }: { 
  title: string, 
  amount: string, 
  change: string, 
  trend: 'up' | 'down',
  icon: any,
  color: 'blue' | 'green' | 'red' | 'purple'
}) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 text-blue-400',
    green: 'from-emerald-500/20 to-emerald-600/20 text-emerald-400',
    red: 'from-red-500/20 to-red-600/20 text-red-400',
    purple: 'from-purple-500/20 to-purple-600/20 text-purple-400',
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-slate-700 transition">
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
          trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {change}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{amount}</p>
      </div>
    </div>
  )
}