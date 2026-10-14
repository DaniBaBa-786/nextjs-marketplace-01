export const metadata = { title: "CraftBay" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 24, background: "#faf8f5" }}>
        <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <a href="/">Shop</a>
          <a href="/admin">Admin</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
