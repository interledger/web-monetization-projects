.class public Landroidx/appcompat/app/B;
.super Landroid/app/Dialog;
.source ""

# interfaces
.implements Landroidx/appcompat/app/n;


# instance fields
.field private a:Landroidx/appcompat/app/o;

.field private final b:La/g/i/d$a;


# direct methods
.method public constructor <init>(Landroid/content/Context;I)V
    .locals 0

    invoke-static {p1, p2}, Landroidx/appcompat/app/B;->a(Landroid/content/Context;I)I

    move-result p2

    invoke-direct {p0, p1, p2}, Landroid/app/Dialog;-><init>(Landroid/content/Context;I)V

    new-instance p1, Landroidx/appcompat/app/A;

    invoke-direct {p1, p0}, Landroidx/appcompat/app/A;-><init>(Landroidx/appcompat/app/B;)V

    iput-object p1, p0, Landroidx/appcompat/app/B;->b:La/g/i/d$a;

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object p1

    const/4 p2, 0x0

    invoke-virtual {p1, p2}, Landroidx/appcompat/app/o;->a(Landroid/os/Bundle;)V

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object p1

    invoke-virtual {p1}, Landroidx/appcompat/app/o;->a()Z

    return-void
.end method

.method private static a(Landroid/content/Context;I)I
    .locals 2

    if-nez p1, :cond_0

    new-instance p1, Landroid/util/TypedValue;

    invoke-direct {p1}, Landroid/util/TypedValue;-><init>()V

    invoke-virtual {p0}, Landroid/content/Context;->getTheme()Landroid/content/res/Resources$Theme;

    move-result-object p0

    sget v0, La/a/a;->dialogTheme:I

    const/4 v1, 0x1

    invoke-virtual {p0, v0, p1, v1}, Landroid/content/res/Resources$Theme;->resolveAttribute(ILandroid/util/TypedValue;Z)Z

    iget p1, p1, Landroid/util/TypedValue;->resourceId:I

    :cond_0
    return p1
.end method


# virtual methods
.method public a(La/a/c/b$a;)La/a/c/b;
    .locals 0

    const/4 p1, 0x0

    return-object p1
.end method

.method public a()Landroidx/appcompat/app/o;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/B;->a:Landroidx/appcompat/app/o;

    if-nez v0, :cond_0

    invoke-static {p0, p0}, Landroidx/appcompat/app/o;->a(Landroid/app/Dialog;Landroidx/appcompat/app/n;)Landroidx/appcompat/app/o;

    move-result-object v0

    iput-object v0, p0, Landroidx/appcompat/app/B;->a:Landroidx/appcompat/app/o;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/app/B;->a:Landroidx/appcompat/app/o;

    return-object v0
.end method

.method public a(La/a/c/b;)V
    .locals 0

    return-void
.end method

.method public a(I)Z
    .locals 1

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroidx/appcompat/app/o;->b(I)Z

    move-result p1

    return p1
.end method

.method a(Landroid/view/KeyEvent;)Z
    .locals 0

    invoke-super {p0, p1}, Landroid/app/Dialog;->dispatchKeyEvent(Landroid/view/KeyEvent;)Z

    move-result p1

    return p1
.end method

.method public addContentView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V
    .locals 1

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0, p1, p2}, Landroidx/appcompat/app/o;->a(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    return-void
.end method

.method public b(La/a/c/b;)V
    .locals 0

    return-void
.end method

.method public dispatchKeyEvent(Landroid/view/KeyEvent;)Z
    .locals 2

    invoke-virtual {p0}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v0

    invoke-virtual {v0}, Landroid/view/Window;->getDecorView()Landroid/view/View;

    move-result-object v0

    iget-object v1, p0, Landroidx/appcompat/app/B;->b:La/g/i/d$a;

    invoke-static {v1, v0, p0, p1}, La/g/i/d;->a(La/g/i/d$a;Landroid/view/View;Landroid/view/Window$Callback;Landroid/view/KeyEvent;)Z

    move-result p1

    return p1
.end method

.method public findViewById(I)Landroid/view/View;
    .locals 1
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "<T:",
            "Landroid/view/View;",
            ">(I)TT;"
        }
    .end annotation

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroidx/appcompat/app/o;->a(I)Landroid/view/View;

    move-result-object p1

    return-object p1
.end method

.method public invalidateOptionsMenu()V
    .locals 1

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0}, Landroidx/appcompat/app/o;->f()V

    return-void
.end method

.method protected onCreate(Landroid/os/Bundle;)V
    .locals 1

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0}, Landroidx/appcompat/app/o;->e()V

    invoke-super {p0, p1}, Landroid/app/Dialog;->onCreate(Landroid/os/Bundle;)V

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroidx/appcompat/app/o;->a(Landroid/os/Bundle;)V

    return-void
.end method

.method protected onStop()V
    .locals 1

    invoke-super {p0}, Landroid/app/Dialog;->onStop()V

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0}, Landroidx/appcompat/app/o;->j()V

    return-void
.end method

.method public setContentView(I)V
    .locals 1

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroidx/appcompat/app/o;->c(I)V

    return-void
.end method

.method public setContentView(Landroid/view/View;)V
    .locals 1

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroidx/appcompat/app/o;->a(Landroid/view/View;)V

    return-void
.end method

.method public setContentView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V
    .locals 1

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0, p1, p2}, Landroidx/appcompat/app/o;->b(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    return-void
.end method

.method public setTitle(I)V
    .locals 2

    invoke-super {p0, p1}, Landroid/app/Dialog;->setTitle(I)V

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {p0}, Landroid/app/Dialog;->getContext()Landroid/content/Context;

    move-result-object v1

    invoke-virtual {v1, p1}, Landroid/content/Context;->getString(I)Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v0, p1}, Landroidx/appcompat/app/o;->a(Ljava/lang/CharSequence;)V

    return-void
.end method

.method public setTitle(Ljava/lang/CharSequence;)V
    .locals 1

    invoke-super {p0, p1}, Landroid/app/Dialog;->setTitle(Ljava/lang/CharSequence;)V

    invoke-virtual {p0}, Landroidx/appcompat/app/B;->a()Landroidx/appcompat/app/o;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroidx/appcompat/app/o;->a(Ljava/lang/CharSequence;)V

    return-void
.end method
