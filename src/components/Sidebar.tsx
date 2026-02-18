interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: '\u{1F4CA}', label: 'Dashboard', active: true },
    { icon: '\u{1F4B0}', label: 'Revenue', active: false },
    { icon: '\u{1F465}', label: 'Users', active: false },
    { icon: '\u{1F4E6}', label: 'Products', active: false },
    { icon: '\u{2699}', label: 'Settings', active: false },
  ];

  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h1 className="logo">{open ? 'Analytics' : 'A'}</h1>
        <button className="toggle-btn" onClick={onToggle}>
          {open ? '\u276E' : '\u276F'}
        </button>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <a key={item.label} className={`nav-item ${item.active ? 'active' : ''}`} href="#">
            <span className="nav-icon">{item.icon}</span>
            {open && <span className="nav-label">{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
