.class public final Landroidx/appcompat/app/x$f;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/app/x;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x1c
    name = "f"
.end annotation


# instance fields
.field a:I

.field b:I

.field c:I

.field d:I

.field e:I

.field f:I

.field g:Landroid/view/ViewGroup;

.field h:Landroid/view/View;

.field i:Landroid/view/View;

.field j:Landroidx/appcompat/view/menu/l;

.field k:Landroidx/appcompat/view/menu/j;

.field l:Landroid/content/Context;

.field m:Z

.field n:Z

.field o:Z

.field public p:Z

.field q:Z

.field r:Z

.field s:Landroid/os/Bundle;


# direct methods
.method constructor <init>(I)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput p1, p0, Landroidx/appcompat/app/x$f;->a:I

    const/4 p1, 0x0

    iput-boolean p1, p0, Landroidx/appcompat/app/x$f;->q:Z

    return-void
.end method


# virtual methods
.method a(Landroidx/appcompat/view/menu/v$a;)Landroidx/appcompat/view/menu/w;
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/app/x$f;->j:Landroidx/appcompat/view/menu/l;

    if-nez v0, :cond_0

    const/4 p1, 0x0

    return-object p1

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/app/x$f;->k:Landroidx/appcompat/view/menu/j;

    if-nez v0, :cond_1

    new-instance v0, Landroidx/appcompat/view/menu/j;

    iget-object v1, p0, Landroidx/appcompat/app/x$f;->l:Landroid/content/Context;

    sget v2, La/a/g;->abc_list_menu_item_layout:I

    invoke-direct {v0, v1, v2}, Landroidx/appcompat/view/menu/j;-><init>(Landroid/content/Context;I)V

    iput-object v0, p0, Landroidx/appcompat/app/x$f;->k:Landroidx/appcompat/view/menu/j;

    iget-object v0, p0, Landroidx/appcompat/app/x$f;->k:Landroidx/appcompat/view/menu/j;

    invoke-virtual {v0, p1}, Landroidx/appcompat/view/menu/j;->a(Landroidx/appcompat/view/menu/v$a;)V

    iget-object p1, p0, Landroidx/appcompat/app/x$f;->j:Landroidx/appcompat/view/menu/l;

    iget-object v0, p0, Landroidx/appcompat/app/x$f;->k:Landroidx/appcompat/view/menu/j;

    invoke-virtual {p1, v0}, Landroidx/appcompat/view/menu/l;->a(Landroidx/appcompat/view/menu/v;)V

    :cond_1
    iget-object p1, p0, Landroidx/appcompat/app/x$f;->k:Landroidx/appcompat/view/menu/j;

    iget-object v0, p0, Landroidx/appcompat/app/x$f;->g:Landroid/view/ViewGroup;

    invoke-virtual {p1, v0}, Landroidx/appcompat/view/menu/j;->a(Landroid/view/ViewGroup;)Landroidx/appcompat/view/menu/w;

    move-result-object p1

    return-object p1
.end method

.method a(Landroid/content/Context;)V
    .locals 4

    new-instance v0, Landroid/util/TypedValue;

    invoke-direct {v0}, Landroid/util/TypedValue;-><init>()V

    invoke-virtual {p1}, Landroid/content/Context;->getResources()Landroid/content/res/Resources;

    move-result-object v1

    invoke-virtual {v1}, Landroid/content/res/Resources;->newTheme()Landroid/content/res/Resources$Theme;

    move-result-object v1

    invoke-virtual {p1}, Landroid/content/Context;->getTheme()Landroid/content/res/Resources$Theme;

    move-result-object v2

    invoke-virtual {v1, v2}, Landroid/content/res/Resources$Theme;->setTo(Landroid/content/res/Resources$Theme;)V

    sget v2, La/a/a;->actionBarPopupTheme:I

    const/4 v3, 0x1

    invoke-virtual {v1, v2, v0, v3}, Landroid/content/res/Resources$Theme;->resolveAttribute(ILandroid/util/TypedValue;Z)Z

    iget v2, v0, Landroid/util/TypedValue;->resourceId:I

    if-eqz v2, :cond_0

    invoke-virtual {v1, v2, v3}, Landroid/content/res/Resources$Theme;->applyStyle(IZ)V

    :cond_0
    sget v2, La/a/a;->panelMenuListTheme:I

    invoke-virtual {v1, v2, v0, v3}, Landroid/content/res/Resources$Theme;->resolveAttribute(ILandroid/util/TypedValue;Z)Z

    iget v0, v0, Landroid/util/TypedValue;->resourceId:I

    if-eqz v0, :cond_1

    goto :goto_0

    :cond_1
    sget v0, La/a/i;->Theme_AppCompat_CompactMenu:I

    :goto_0
    invoke-virtual {v1, v0, v3}, Landroid/content/res/Resources$Theme;->applyStyle(IZ)V

    new-instance v0, La/a/c/d;

    const/4 v2, 0x0

    invoke-direct {v0, p1, v2}, La/a/c/d;-><init>(Landroid/content/Context;I)V

    invoke-virtual {v0}, La/a/c/d;->getTheme()Landroid/content/res/Resources$Theme;

    move-result-object p1

    invoke-virtual {p1, v1}, Landroid/content/res/Resources$Theme;->setTo(Landroid/content/res/Resources$Theme;)V

    iput-object v0, p0, Landroidx/appcompat/app/x$f;->l:Landroid/content/Context;

    sget-object p1, La/a/j;->AppCompatTheme:[I

    invoke-virtual {v0, p1}, Landroid/content/Context;->obtainStyledAttributes([I)Landroid/content/res/TypedArray;

    move-result-object p1

    sget v0, La/a/j;->AppCompatTheme_panelBackground:I

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getResourceId(II)I

    move-result v0

    iput v0, p0, Landroidx/appcompat/app/x$f;->b:I

    sget v0, La/a/j;->AppCompatTheme_android_windowAnimationStyle:I

    invoke-virtual {p1, v0, v2}, Landroid/content/res/TypedArray;->getResourceId(II)I

    move-result v0

    iput v0, p0, Landroidx/appcompat/app/x$f;->f:I

    invoke-virtual {p1}, Landroid/content/res/TypedArray;->recycle()V

    return-void
.end method

.method a(Landroidx/appcompat/view/menu/l;)V
    .locals 2

    iget-object v0, p0, Landroidx/appcompat/app/x$f;->j:Landroidx/appcompat/view/menu/l;

    if-ne p1, v0, :cond_0

    return-void

    :cond_0
    if-eqz v0, :cond_1

    iget-object v1, p0, Landroidx/appcompat/app/x$f;->k:Landroidx/appcompat/view/menu/j;

    invoke-virtual {v0, v1}, Landroidx/appcompat/view/menu/l;->b(Landroidx/appcompat/view/menu/v;)V

    :cond_1
    iput-object p1, p0, Landroidx/appcompat/app/x$f;->j:Landroidx/appcompat/view/menu/l;

    if-eqz p1, :cond_2

    iget-object v0, p0, Landroidx/appcompat/app/x$f;->k:Landroidx/appcompat/view/menu/j;

    if-eqz v0, :cond_2

    invoke-virtual {p1, v0}, Landroidx/appcompat/view/menu/l;->a(Landroidx/appcompat/view/menu/v;)V

    :cond_2
    return-void
.end method

.method public a()Z
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/app/x$f;->h:Landroid/view/View;

    const/4 v1, 0x0

    if-nez v0, :cond_0

    return v1

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/app/x$f;->i:Landroid/view/View;

    const/4 v2, 0x1

    if-eqz v0, :cond_1

    return v2

    :cond_1
    iget-object v0, p0, Landroidx/appcompat/app/x$f;->k:Landroidx/appcompat/view/menu/j;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/j;->b()Landroid/widget/ListAdapter;

    move-result-object v0

    invoke-interface {v0}, Landroid/widget/ListAdapter;->getCount()I

    move-result v0

    if-lez v0, :cond_2

    move v1, v2

    :cond_2
    return v1
.end method
