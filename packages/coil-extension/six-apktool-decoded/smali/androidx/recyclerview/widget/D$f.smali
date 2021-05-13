.class Landroidx/recyclerview/widget/D$f;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroidx/recyclerview/widget/D$e$b;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "f"
.end annotation


# instance fields
.field final synthetic a:Landroidx/recyclerview/widget/D;


# direct methods
.method constructor <init>(Landroidx/recyclerview/widget/D;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/D$f;->a:Landroidx/recyclerview/widget/D;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroidx/recyclerview/widget/D$w;)V
    .locals 2

    const/4 v0, 0x1

    invoke-virtual {p1, v0}, Landroidx/recyclerview/widget/D$w;->a(Z)V

    iget-object v0, p1, Landroidx/recyclerview/widget/D$w;->i:Landroidx/recyclerview/widget/D$w;

    const/4 v1, 0x0

    if-eqz v0, :cond_0

    iget-object v0, p1, Landroidx/recyclerview/widget/D$w;->j:Landroidx/recyclerview/widget/D$w;

    if-nez v0, :cond_0

    iput-object v1, p1, Landroidx/recyclerview/widget/D$w;->i:Landroidx/recyclerview/widget/D$w;

    :cond_0
    iput-object v1, p1, Landroidx/recyclerview/widget/D$w;->j:Landroidx/recyclerview/widget/D$w;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->w()Z

    move-result v0

    if-nez v0, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$f;->a:Landroidx/recyclerview/widget/D;

    iget-object v1, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v0, v1}, Landroidx/recyclerview/widget/D;->k(Landroid/view/View;)Z

    move-result v0

    if-nez v0, :cond_1

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$w;->r()Z

    move-result v0

    if-eqz v0, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$f;->a:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    const/4 v1, 0x0

    invoke-virtual {v0, p1, v1}, Landroidx/recyclerview/widget/D;->removeDetachedView(Landroid/view/View;Z)V

    :cond_1
    return-void
.end method
