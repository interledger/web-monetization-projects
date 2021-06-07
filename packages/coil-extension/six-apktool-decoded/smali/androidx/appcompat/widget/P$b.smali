.class Landroidx/appcompat/widget/P$b;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/widget/P;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "b"
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/widget/P;


# direct methods
.method constructor <init>(Landroidx/appcompat/widget/P;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/P$b;->a:Landroidx/appcompat/widget/P;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/P$b;->a:Landroidx/appcompat/widget/P;

    invoke-virtual {v0}, Landroidx/appcompat/widget/P;->d()V

    return-void
.end method
