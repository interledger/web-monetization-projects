.class final Landroidx/appcompat/app/x$g;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroidx/appcompat/view/menu/v$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/app/x;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x12
    name = "g"
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/x;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/x;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/x$g;->a:Landroidx/appcompat/app/x;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroidx/appcompat/view/menu/l;Z)V
    .locals 4

    invoke-virtual {p1}, Landroidx/appcompat/view/menu/l;->m()Landroidx/appcompat/view/menu/l;

    move-result-object v0

    const/4 v1, 0x1

    if-eq v0, p1, :cond_0

    move v2, v1

    goto :goto_0

    :cond_0
    const/4 v2, 0x0

    :goto_0
    iget-object v3, p0, Landroidx/appcompat/app/x$g;->a:Landroidx/appcompat/app/x;

    if-eqz v2, :cond_1

    move-object p1, v0

    :cond_1
    invoke-virtual {v3, p1}, Landroidx/appcompat/app/x;->a(Landroid/view/Menu;)Landroidx/appcompat/app/x$f;

    move-result-object p1

    if-eqz p1, :cond_3

    if-eqz v2, :cond_2

    iget-object p2, p0, Landroidx/appcompat/app/x$g;->a:Landroidx/appcompat/app/x;

    iget v2, p1, Landroidx/appcompat/app/x$f;->a:I

    invoke-virtual {p2, v2, p1, v0}, Landroidx/appcompat/app/x;->a(ILandroidx/appcompat/app/x$f;Landroid/view/Menu;)V

    iget-object p2, p0, Landroidx/appcompat/app/x$g;->a:Landroidx/appcompat/app/x;

    invoke-virtual {p2, p1, v1}, Landroidx/appcompat/app/x;->a(Landroidx/appcompat/app/x$f;Z)V

    goto :goto_1

    :cond_2
    iget-object v0, p0, Landroidx/appcompat/app/x$g;->a:Landroidx/appcompat/app/x;

    invoke-virtual {v0, p1, p2}, Landroidx/appcompat/app/x;->a(Landroidx/appcompat/app/x$f;Z)V

    :cond_3
    :goto_1
    return-void
.end method

.method public a(Landroidx/appcompat/view/menu/l;)Z
    .locals 2

    if-nez p1, :cond_0

    iget-object v0, p0, Landroidx/appcompat/app/x$g;->a:Landroidx/appcompat/app/x;

    iget-boolean v1, v0, Landroidx/appcompat/app/x;->B:Z

    if-eqz v1, :cond_0

    invoke-virtual {v0}, Landroidx/appcompat/app/x;->o()Landroid/view/Window$Callback;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v1, p0, Landroidx/appcompat/app/x$g;->a:Landroidx/appcompat/app/x;

    iget-boolean v1, v1, Landroidx/appcompat/app/x;->K:Z

    if-nez v1, :cond_0

    const/16 v1, 0x6c

    invoke-interface {v0, v1, p1}, Landroid/view/Window$Callback;->onMenuOpened(ILandroid/view/Menu;)Z

    :cond_0
    const/4 p1, 0x1

    return p1
.end method
