.class public Landroidx/appcompat/app/I$a;
.super La/a/c/b;
.source ""

# interfaces
.implements Landroidx/appcompat/view/menu/l$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/app/I;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x1
    name = "a"
.end annotation


# instance fields
.field private final c:Landroid/content/Context;

.field private final d:Landroidx/appcompat/view/menu/l;

.field private e:La/a/c/b$a;

.field private f:Ljava/lang/ref/WeakReference;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/lang/ref/WeakReference<",
            "Landroid/view/View;",
            ">;"
        }
    .end annotation
.end field

.field final synthetic g:Landroidx/appcompat/app/I;


# direct methods
.method public constructor <init>(Landroidx/appcompat/app/I;Landroid/content/Context;La/a/c/b$a;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    invoke-direct {p0}, La/a/c/b;-><init>()V

    iput-object p2, p0, Landroidx/appcompat/app/I$a;->c:Landroid/content/Context;

    iput-object p3, p0, Landroidx/appcompat/app/I$a;->e:La/a/c/b$a;

    new-instance p1, Landroidx/appcompat/view/menu/l;

    invoke-direct {p1, p2}, Landroidx/appcompat/view/menu/l;-><init>(Landroid/content/Context;)V

    const/4 p2, 0x1

    invoke-virtual {p1, p2}, Landroidx/appcompat/view/menu/l;->c(I)Landroidx/appcompat/view/menu/l;

    iput-object p1, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    iget-object p1, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-virtual {p1, p0}, Landroidx/appcompat/view/menu/l;->a(Landroidx/appcompat/view/menu/l$a;)V

    return-void
.end method


# virtual methods
.method public a()V
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v1, v0, Landroidx/appcompat/app/I;->p:Landroidx/appcompat/app/I$a;

    if-eq v1, p0, :cond_0

    return-void

    :cond_0
    iget-boolean v1, v0, Landroidx/appcompat/app/I;->x:Z

    iget-boolean v0, v0, Landroidx/appcompat/app/I;->y:Z

    const/4 v2, 0x0

    invoke-static {v1, v0, v2}, Landroidx/appcompat/app/I;->a(ZZZ)Z

    move-result v0

    if-nez v0, :cond_1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iput-object p0, v0, Landroidx/appcompat/app/I;->q:La/a/c/b;

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->e:La/a/c/b$a;

    iput-object v1, v0, Landroidx/appcompat/app/I;->r:La/a/c/b$a;

    goto :goto_0

    :cond_1
    iget-object v0, p0, Landroidx/appcompat/app/I$a;->e:La/a/c/b$a;

    invoke-interface {v0, p0}, La/a/c/b$a;->a(La/a/c/b;)V

    :goto_0
    const/4 v0, 0x0

    iput-object v0, p0, Landroidx/appcompat/app/I$a;->e:La/a/c/b$a;

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    invoke-virtual {v1, v2}, Landroidx/appcompat/app/I;->e(Z)V

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v1, v1, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v1}, Landroidx/appcompat/widget/ActionBarContextView;->a()V

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v1, v1, Landroidx/appcompat/app/I;->i:Landroidx/appcompat/widget/L;

    invoke-interface {v1}, Landroidx/appcompat/widget/L;->j()Landroid/view/ViewGroup;

    move-result-object v1

    const/16 v2, 0x20

    invoke-virtual {v1, v2}, Landroid/view/ViewGroup;->sendAccessibilityEvent(I)V

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v2, v1, Landroidx/appcompat/app/I;->g:Landroidx/appcompat/widget/ActionBarOverlayLayout;

    iget-boolean v1, v1, Landroidx/appcompat/app/I;->D:Z

    invoke-virtual {v2, v1}, Landroidx/appcompat/widget/ActionBarOverlayLayout;->setHideOnContentScrollEnabled(Z)V

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iput-object v0, v1, Landroidx/appcompat/app/I;->p:Landroidx/appcompat/app/I$a;

    return-void
.end method

.method public a(I)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->c:Landroid/content/Context;

    invoke-virtual {v0}, Landroid/content/Context;->getResources()Landroid/content/res/Resources;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroid/content/res/Resources;->getString(I)Ljava/lang/String;

    move-result-object p1

    invoke-virtual {p0, p1}, Landroidx/appcompat/app/I$a;->a(Ljava/lang/CharSequence;)V

    return-void
.end method

.method public a(Landroid/view/View;)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0, p1}, Landroidx/appcompat/widget/ActionBarContextView;->setCustomView(Landroid/view/View;)V

    new-instance v0, Ljava/lang/ref/WeakReference;

    invoke-direct {v0, p1}, Ljava/lang/ref/WeakReference;-><init>(Ljava/lang/Object;)V

    iput-object v0, p0, Landroidx/appcompat/app/I$a;->f:Ljava/lang/ref/WeakReference;

    return-void
.end method

.method public a(Landroidx/appcompat/view/menu/l;)V
    .locals 0

    iget-object p1, p0, Landroidx/appcompat/app/I$a;->e:La/a/c/b$a;

    if-nez p1, :cond_0

    return-void

    :cond_0
    invoke-virtual {p0}, Landroidx/appcompat/app/I$a;->i()V

    iget-object p1, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object p1, p1, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {p1}, Landroidx/appcompat/widget/ActionBarContextView;->d()Z

    return-void
.end method

.method public a(Ljava/lang/CharSequence;)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0, p1}, Landroidx/appcompat/widget/ActionBarContextView;->setSubtitle(Ljava/lang/CharSequence;)V

    return-void
.end method

.method public a(Z)V
    .locals 1

    invoke-super {p0, p1}, La/a/c/b;->a(Z)V

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0, p1}, Landroidx/appcompat/widget/ActionBarContextView;->setTitleOptional(Z)V

    return-void
.end method

.method public a(Landroidx/appcompat/view/menu/l;Landroid/view/MenuItem;)Z
    .locals 0

    iget-object p1, p0, Landroidx/appcompat/app/I$a;->e:La/a/c/b$a;

    if-eqz p1, :cond_0

    invoke-interface {p1, p0, p2}, La/a/c/b$a;->a(La/a/c/b;Landroid/view/MenuItem;)Z

    move-result p1

    return p1

    :cond_0
    const/4 p1, 0x0

    return p1
.end method

.method public b()Landroid/view/View;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->f:Ljava/lang/ref/WeakReference;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Ljava/lang/ref/WeakReference;->get()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/view/View;

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return-object v0
.end method

.method public b(I)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->c:Landroid/content/Context;

    invoke-virtual {v0}, Landroid/content/Context;->getResources()Landroid/content/res/Resources;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroid/content/res/Resources;->getString(I)Ljava/lang/String;

    move-result-object p1

    invoke-virtual {p0, p1}, Landroidx/appcompat/app/I$a;->b(Ljava/lang/CharSequence;)V

    return-void
.end method

.method public b(Ljava/lang/CharSequence;)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0, p1}, Landroidx/appcompat/widget/ActionBarContextView;->setTitle(Ljava/lang/CharSequence;)V

    return-void
.end method

.method public c()Landroid/view/Menu;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    return-object v0
.end method

.method public d()Landroid/view/MenuInflater;
    .locals 2

    new-instance v0, La/a/c/g;

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->c:Landroid/content/Context;

    invoke-direct {v0, v1}, La/a/c/g;-><init>(Landroid/content/Context;)V

    return-object v0
.end method

.method public e()Ljava/lang/CharSequence;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0}, Landroidx/appcompat/widget/ActionBarContextView;->getSubtitle()Ljava/lang/CharSequence;

    move-result-object v0

    return-object v0
.end method

.method public g()Ljava/lang/CharSequence;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0}, Landroidx/appcompat/widget/ActionBarContextView;->getTitle()Ljava/lang/CharSequence;

    move-result-object v0

    return-object v0
.end method

.method public i()V
    .locals 2

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->p:Landroidx/appcompat/app/I$a;

    if-eq v0, p0, :cond_0

    return-void

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/l;->s()V

    :try_start_0
    iget-object v0, p0, Landroidx/appcompat/app/I$a;->e:La/a/c/b$a;

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-interface {v0, p0, v1}, La/a/c/b$a;->b(La/a/c/b;Landroid/view/Menu;)Z
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/l;->r()V

    return-void

    :catchall_0
    move-exception v0

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v1}, Landroidx/appcompat/view/menu/l;->r()V

    throw v0
.end method

.method public j()Z
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->g:Landroidx/appcompat/app/I;

    iget-object v0, v0, Landroidx/appcompat/app/I;->j:Landroidx/appcompat/widget/ActionBarContextView;

    invoke-virtual {v0}, Landroidx/appcompat/widget/ActionBarContextView;->b()Z

    move-result v0

    return v0
.end method

.method public k()Z
    .locals 2

    iget-object v0, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/l;->s()V

    :try_start_0
    iget-object v0, p0, Landroidx/appcompat/app/I$a;->e:La/a/c/b$a;

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-interface {v0, p0, v1}, La/a/c/b$a;->a(La/a/c/b;Landroid/view/Menu;)Z

    move-result v0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v1}, Landroidx/appcompat/view/menu/l;->r()V

    return v0

    :catchall_0
    move-exception v0

    iget-object v1, p0, Landroidx/appcompat/app/I$a;->d:Landroidx/appcompat/view/menu/l;

    invoke-virtual {v1}, Landroidx/appcompat/view/menu/l;->r()V

    throw v0
.end method
