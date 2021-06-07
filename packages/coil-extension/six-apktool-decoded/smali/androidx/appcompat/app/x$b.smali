.class Landroidx/appcompat/app/x$b;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/a/c/b$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/app/x;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = "b"
.end annotation


# instance fields
.field private a:La/a/c/b$a;

.field final synthetic b:Landroidx/appcompat/app/x;


# direct methods
.method public constructor <init>(Landroidx/appcompat/app/x;La/a/c/b$a;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p2, p0, Landroidx/appcompat/app/x$b;->a:La/a/c/b$a;

    return-void
.end method


# virtual methods
.method public a(La/a/c/b;)V
    .locals 2

    iget-object v0, p0, Landroidx/appcompat/app/x$b;->a:La/a/c/b$a;

    invoke-interface {v0, p1}, La/a/c/b$a;->a(La/a/c/b;)V

    iget-object p1, p0, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object v0, p1, Landroidx/appcompat/app/x;->r:Landroid/widget/PopupWindow;

    if-eqz v0, :cond_0

    iget-object p1, p1, Landroidx/appcompat/app/x;->f:Landroid/view/Window;

    invoke-virtual {p1}, Landroid/view/Window;->getDecorView()Landroid/view/View;

    move-result-object p1

    iget-object v0, p0, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object v0, v0, Landroidx/appcompat/app/x;->s:Ljava/lang/Runnable;

    invoke-virtual {p1, v0}, Landroid/view/View;->removeCallbacks(Ljava/lang/Runnable;)Z

    :cond_0
    iget-object p1, p0, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object v0, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    if-eqz v0, :cond_1

    invoke-virtual {p1}, Landroidx/appcompat/app/x;->l()V

    iget-object p1, p0, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object v0, p1, Landroidx/appcompat/app/x;->q:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-static {v0}, La/g/i/s;->a(Landroid/view/View;)La/g/i/y;

    move-result-object v0

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, La/g/i/y;->a(F)La/g/i/y;

    iput-object v0, p1, Landroidx/appcompat/app/x;->t:La/g/i/y;

    iget-object p1, p0, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object p1, p1, Landroidx/appcompat/app/x;->t:La/g/i/y;

    new-instance v0, Landroidx/appcompat/app/y;

    invoke-direct {v0, p0}, Landroidx/appcompat/app/y;-><init>(Landroidx/appcompat/app/x$b;)V

    invoke-virtual {p1, v0}, La/g/i/y;->a(La/g/i/z;)La/g/i/y;

    :cond_1
    iget-object p1, p0, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    iget-object v0, p1, Landroidx/appcompat/app/x;->i:Landroidx/appcompat/app/n;

    if-eqz v0, :cond_2

    iget-object p1, p1, Landroidx/appcompat/app/x;->p:La/a/c/b;

    invoke-interface {v0, p1}, Landroidx/appcompat/app/n;->b(La/a/c/b;)V

    :cond_2
    iget-object p1, p0, Landroidx/appcompat/app/x$b;->b:Landroidx/appcompat/app/x;

    const/4 v0, 0x0

    iput-object v0, p1, Landroidx/appcompat/app/x;->p:La/a/c/b;

    return-void
.end method

.method public a(La/a/c/b;Landroid/view/Menu;)Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/x$b;->a:La/a/c/b$a;

    invoke-interface {v0, p1, p2}, La/a/c/b$a;->a(La/a/c/b;Landroid/view/Menu;)Z

    move-result p1

    return p1
.end method

.method public a(La/a/c/b;Landroid/view/MenuItem;)Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/x$b;->a:La/a/c/b$a;

    invoke-interface {v0, p1, p2}, La/a/c/b$a;->a(La/a/c/b;Landroid/view/MenuItem;)Z

    move-result p1

    return p1
.end method

.method public b(La/a/c/b;Landroid/view/Menu;)Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/x$b;->a:La/a/c/b$a;

    invoke-interface {v0, p1, p2}, La/a/c/b$a;->b(La/a/c/b;Landroid/view/Menu;)Z

    move-result p1

    return p1
.end method
